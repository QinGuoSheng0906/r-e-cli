/*
   路由配置
   秦国胜
   2019-12-18
*/
import React, { Component } from 'react';
import { Route, Switch /* Redirect */ } from 'react-router-dom';
import ErrorBoundary from './errorBoundary';  

import { Main } from '@components'                           // 容器组件 
import Login from '@pages/login';                                  // 登录组件单独处理
import Err404 from '@pages/404';                                   // 404
import Home from '@pages/home'
import Hooks from '@pages/hooks'
class RouterApp extends Component {
   // 路由视图
   views = () => {
      console.log(111)
   }
   render () {
      return (
         <ErrorBoundary>
            <Switch>
               <Route path = '/' exact component = { Login } />
               <Route path = '/login' exact component = { Login } />
               <Route path = '/hooks' component = { Hooks } />
               <Main history = { this.props.history }>
                  <Switch>
                     <Route path = '/home'  component = { Home } />
                     <Route exact component = { Err404 } />
                  </Switch>
               </Main>
               <Route exact component = { Err404 } />
            </Switch>
         </ErrorBoundary>
       
      )
   }
}
export default RouterApp