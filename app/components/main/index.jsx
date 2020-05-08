// 最外层容器组件
import React, { Component } from 'react'
import Header from './component/header' // 顶部菜单
import Sider from './component/sider' // 左侧菜单
import Content from './component/content' // 容器
import './style.less'

class Main extends Component {
   // static getDerivedStateFromProps (props, state) {
   //    console.log(props,state)
   //    return null
   // }
   render () {
      return (
         <>
            <h1>这里是容器</h1>
            <Header />
            <Sider />
            <Content> 
               { /* { this.props.children } */ }
            </Content>
         </>
      )
   }
}
export default Main