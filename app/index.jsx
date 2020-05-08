/*
   index.jsx 入口配置文件
   秦国胜
   2019-12-05
*/
// 处理ie兼容
window.Promise = Promise;
window.Set = Set;
window.Map = Map;
  
// 入口配置文件
import React from 'react';
import { render } from 'react-dom';
import {  HashRouter as Router } from 'react-router-dom';
// 状态管理
import { Provider } from 'react-redux';
import Store from './stores';                       // 状态管理数据
// 状态数据持久化 会存储在 localStorage 中
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist'
import { Loading } from './components'
const persistor = persistStore(Store);
// 路由
import Routers from './routers'

// UI组件国际化
import { ConfigProvider } from 'antd';                                  
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
//全局公共样式
import '@assets/styles/global.less';                                     

render(
   <Provider store = { Store }>
      <PersistGate loading = { <Loading /> } persistor = { persistor }>
         <ConfigProvider locale = { zh_CN }>
            <Router>
               <Routers />
            </Router>
         </ConfigProvider>
      </PersistGate>
   </Provider>
   ,
   document.getElementById('root')
);