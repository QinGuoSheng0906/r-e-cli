import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
// actions
import { Citys } from '@/stores/actions/index'
import { ASNYJOB1 } from '@/stores/actions/actionTypes'
import { Utils } from '@/lib'
import './style.less'
import Child from './component/child'
// hook 使用

class Home extends Component {
   constructor (props) {
      super(props)
      this.state = {
         text: '111'
      }
   }
   static getDerivedStateFromProps (props) {
      console.log(props)
      return null
   }
   
   componentDidMount () {
      let citys = JSON.parse(JSON.stringify(this.props.citys))
      citys[2] = { key: '2',name:'张三' }
      this.props.newCity(citys)
      this.props.asyncJob()
      let aa = Utils.bankFormat(1234567843211234)
      let bb = Utils.phoneFormat(18723305503,false)
      let dd = Utils.dateFormat({ time: '2019/12/22' })
      console.log(aa)
      console.log(bb)
      console.log(dd)
      let str = '张三李四王麻子'
      console.log(str.includes('李飞')) // false
      console.log(this.state)
   }

   view = () => {
      let { jobs } = this.props
      return jobs.map((i,index) => {
         return (
            <span key = { index }>{ i.jobName }</span>
         )
      })
   }
   
   render () {
      let { jobs, asyncJob1 } = this.props
      return (
         <div className = 'home'>
            这里是首页
            <div>数据异步切换：{ jobs && this.view() }</div>
            <div>
               <Button onClick = { asyncJob1 }>点击</Button>
            </div>
            <Child />
         </div>
      )
   }
}

// 读取数据 映射状态管理的数据 其实也就是把Redux中的数据映射到React中的props中去。
function mapStateToProps (state){
   return {
      citys: state.citys,
      jobs: state.jobs
   };
}
// 设置数据 把各种dispatch也变成了props让你可以直接使用
function mapDispatchToProps (dispatch) {
   return {
      // 处理同步
      newCity: data => dispatch(Citys.newCity(data)),
      // 处理异步
      asyncJob: () => {
         dispatch({
            type: 'ASNYJOB'
         });
      },
      // 处理异步
      asyncJob1: () => dispatch({ type: ASNYJOB1 })
   };
}
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Home);