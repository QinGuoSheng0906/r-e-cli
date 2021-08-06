/*
 * @Descripttion: 容器
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-10-27 17:56:00
 * @LastEditTime: 
*/
import React, { Component } from 'react';

import {  BrowserRouter } from 'react-router-dom';
// import {  HashRouter } from 'react-router-dom';

// 只更改需要改变的部分
import { hot } from 'react-hot-loader/root';

// 状态管理
import { Provider } from 'react-redux';
import Store from './stores';                       // 状态管理数据

//状态数据持久化 会存储在 localStorage 中
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist'
import { Loading } from '@components/index.js'
const persistor = persistStore(Store);


// UI组件国际化
import { ConfigProvider } from 'antd';                                  
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import RouterView from './routers';

import '@assets/styles/global.less'



class App extends Component {
   render () {
      return (
         <Provider  store = { Store }>
            <PersistGate loading = { <Loading /> } persistor = { persistor }>
               <ConfigProvider locale = { zh_CN }>
                  <BrowserRouter>
                     <RouterView />
                  </BrowserRouter>
               </ConfigProvider>
            </PersistGate>
            
         </Provider>
      )
   }
}
 

export default hot(App);