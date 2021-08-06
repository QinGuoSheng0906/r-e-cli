/*
   index.jsx 入口配置文件
   秦国胜
   2019-12-05
*/
  
// 入口配置文件
import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx'; // 容器

//全局公共样式
import '@assets/styles/global.less';   
render(
   <App />
   ,
   document.getElementById('root')
);