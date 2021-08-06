/*
 * 验证码
 * 秦国胜
 * 2020-11-03
 */

//引入express模块
const express = require('express');
//定义路由级中间件
const router = express.Router();

// 生成验证码
const svgCaptcha = require('svg-captcha');

// cookie
const cookieParser = require('cookie-parser');
router.use(cookieParser());

// 登录验证码
router.get('/login-code/',  (req, res) => {
   let captcha = svgCaptcha.create({
      // inverse: false, // 反转颜色 
      color: true, // 彩色
      fontSize: 48, // 字体大小 
      noise: 2, // 噪声线条数 
      width: req.query.width || 100, // 宽度 
      height: req.query.height || 30, // 高度 
      size: 4,// 验证码长度
      ignoreChars: '0oO1ilI' // 验证码字符中排除 0oO1ilI
   });
   // 保存到session,忽略大小写 
   req.session = captcha.text.toLowerCase();
   //保存到cookie 方便前端调用验证
   res.cookie('loginCode', req.session);
   res.setHeader('Content-Type', 'image/svg+xml');
   // res.write(String(captcha.data));
   res.send({
      status: 200,
      succeed: true,
      msg: '获取验证码',
      data: captcha.data
   });
});

module.exports = router;

