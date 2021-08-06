/*
*  用户登录相关
*/

//引入express模块
const express = require('express');
//定义路由级中间件
const router = express.Router();

//引入数据模型模块
const userinfo = require('../models/userinfo');

// 链接数据库
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:8899/userDatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;
conn.on('error', () => console.error('连接数据库失败'));

// 登录
router.post('/login/',(req, res) => {
   let { userName, password, phone  } = req.body;
   let index = userName ? userinfo.find({ userName, password }) : userinfo.find({ phone, password }) ;
   index.then(item => {
      if(item.length > 0){
         res.json({ 
            status: 200,
            succeed: true,
            msg: '登录成功',
            data: item[0]
         });
      } else {
         res.json({ 
            status: 200, 
            succeed: false,
            msg: '用户名或密码错误'
         });
      }
   })
      .catch(err => {
         res.json(err);
      });
})
 
module.exports = router;

