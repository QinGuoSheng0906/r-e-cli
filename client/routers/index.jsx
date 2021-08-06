/*
 * @Descripttion: 路由配置
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-10-29 16:09:00
 * @LastEditTime: 
*/

import React, { Component } from 'react';
import { Route, Switch /* Redirect */ } from 'react-router-dom';
import ErrorBoundary from './errorBoundary';  

import Layout from '@pages/layout';                                  // 布局容器
import Login from '@/pages/login-register-password';                                    // 登录组件单独处理
import Err404 from '@pages/err404';                                  // 404

import RouterConfig from './routerConfig';                           // 路由配置
// import asyncComponent from './asyncComponent';                    // 按需加载


class RouterView extends Component {
   // 布局路由视图
   routeViews = () => {
      let init = (router) => {
         if(!router) return;
         return router.map((item) => {
            if(item.children && item.children.length) {
               return init(item.children);
            } else {
               return (
                  <Route 
                     exact = { !item.isExact }
                     path = { item.path }
                     render = { (props) => {
                        console.log('props222', props);
                        document.title = item.title;
                        return <item.component />;
                     }}
                  />
               );
            }
         })
      }
      return init(RouterConfig); 
   }
   render () {
      return (
         <ErrorBoundary>
            <Switch>
               <Route path = '/' 
                  exact
                  component = { Login }
               />
               <Route path = '/login' 
                  exact
                  component = { Login }
               />
               <Route
                  path = '/client'
                  render = { () => <Layout>
                     <Switch>
                        { this.routeViews() }
                        <Route component = {Err404} />
                     </Switch>
                  </Layout> } 
               />
               <Route component = {Err404} exact />
            </Switch>
         </ErrorBoundary>
      )
   }
}
export default RouterView;