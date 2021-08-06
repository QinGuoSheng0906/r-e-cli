const createError = require('http-errors');
const express = require('express');
const path = require('path');
const compression = require('compression')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

//extended:false 不使用第三方模块处理参数，使用Nodejs内置模块querystring处理
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const indexRouter = require('./service/routes/index');
// const hero = require('./service/routes/hero');
const captcha = require('./service/routes/captcha'); // 验证码
const userinfo = require('./service/routes/userinfo'); // 用户登录注册相关


// 导入路由
app.use('/', indexRouter);
// app.use('/hero', hero);
app.use('/captcha', captcha);
app.use('/userinfo', userinfo);

// view engine setup 定义模板引擎
app.set('views', path.join(__dirname, './service/views')); //设置视图的对应目录
app.set('view engine', 'jade');    // 设置默认的模板引擎


app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(compression())
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, './service/public'))); // 获取静态资源
app.use(express.static(path.join(__dirname, './client/dist'))); // 获取静态资源

app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname, './client/dist', 'index.html'))
})

// 捕获404并转发给错误处理程序
app.use(function (req, res) {
   fs.readFile(path.resolve(__dirname, './client/dist', 'index.html'), function (err, data){
      if(err){
         console.log(err)
         res.send('后台错误')
      } else {
         res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
         });
         res.end(data)
      }
   })
   // let err = new Error('ERROR NO PAGE FOUND');
   // err.status = 404;
   // next(createError(404));
});



// error handler
app.use(function (err, req, res) {
   console.log(err);
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};
   // render the error page
   res.status(err.status || 500);
   res.render('error');
});

// 端口号
process.env.PORT = 8888;

// CORS 跨域资源
app.use(function (req, res, next) { 
   const { origin, Origin, referer, Referer } = req.headers;
   const allowOrigin = origin || Origin || referer || Referer || '*';
   res.header('Access-Control-Allow-Origin', allowOrigin);
   // res.header('Access-Control-Allow-Origin', '*');
   // 响应头
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   // 允许客户端使用 GET, POST, HEAD, DELETE 方式请求资源
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, DELETE, OPTIONS'); 
   // 允许发送Cookie
   res.header('Access-Control-Allow-Credentials', true); 
   // 允许客户端使用所有的HTTP请求方式
   res.setHeader('Access-Control-Alow-Methods', '*');

   if (req.method == 'OPTIONS') {
      res.sendStatus(200);
   } else {
      next();
   }
});


console.log('端口号: ', process.env.PORT );
console.log('地址: http://localhost:', process.env.PORT );

module.exports = app;
