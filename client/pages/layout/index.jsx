/*
 * @Descripttion: 通用布局容器
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-10-29 14:47:00
 * @LastEditTime: 
*/
import React, { Component } from 'react';

import './style.less';

class Layout extends Component {
   componentDidMount () {
      console.log(process.env.PROCESS_ENV);
   }
   render () {
      return (
         <div className = 'layout'>
            <p>这里是布局layout布局容器</p>
            { this.props.children }
         </div>
      )
   }
}
export default Layout;