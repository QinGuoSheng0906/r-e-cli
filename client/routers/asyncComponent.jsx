/*
 * @Descripttion: 按需加载
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-10-29 14:47:00
 * @LastEditTime: 
*/

import React, { Component } from 'react';
 
export default function asyncComponent (importComponent) {
   class AsyncComponent extends Component {
      constructor (props) {
         super(props);
         this.state = {
            component: null
         };
      }
      async componentDidMount () {
         const { default: component } = await importComponent();
 
         this.setState({
            component: component
         });
      }
      render () {
         const C = this.state.component;
         return C ? <C {...this.props} /> : null;
      }
   }
 
   return AsyncComponent;
}