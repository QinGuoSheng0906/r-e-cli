/*
 * @Descripttion: 主页
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-10-28 10:19:00
 * @LastEditTime: 
*/
import React, { Component } from 'react';

import './style.less';
import BG1 from '@images/bg-1.jpg';
class App extends Component {
   // componentDidMount () {
   //    console.log(process.env.PROCESS_ENV);
   //    console.log(this.props);
   // }
   render () {
      return (
         <div className = 'home'>
            <p>这里home页</p>
            <img className = 'home-img' src = { BG1 } />
         </div>
      )
   }
}
export default App;