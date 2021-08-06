//引入express模块
const express = require('express');
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Hero = require('../models/hero');

// mongoose.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:8899/orders', { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;
conn.on('error', () => console.error('连接数据库失败'));

// 查询英雄列表
router.get('/getHero', (req, res) => {
   Hero.find({})
      .sort({ update_at: -1 })
      .then(heros => {
         res.json({
            status: 200, 
            message: '查询成功',
            data: heros
         });
      })
      .catch(err => {
         res.json(err);
      });
});

// 添加一个英雄信息路由
router.post('/addHero', (req, res) => {
   let index = Hero.find({ name: req.body.name, age: req.body.age });
   index.then(heros => {
      if(heros.length > 0){
         res.json({ status: 200, message: '重复添加' });
      } else {
         Hero.create(req.body, (err) => {
            if (err) {
               res.json(err);
            } else {
               res.json({ status: 200, message: '添加成功' });
            }
         });
      }
   })
      .catch(err => {
         res.json(err);
      });
});

//修改一条英雄信息数据路由
router.put('/editHero/:id', (req, res) => {
   Hero.findOneAndUpdate(
      { _id: req.params.id },
      {
         $set: {
            name: req.body.name,
            age: req.body.age,
            sex: req.body.sex,
            address: req.body.address,
            dowhat: req.body.dowhat,
            favourite: req.body.favourite,
            explain: req.body.explain
         }
      },
      {
         new: true
      }
   )
      .then(hero => res.json(hero))
      .catch(err => res.json(err));
});

// 删除一个英雄
 
module.exports = router;
