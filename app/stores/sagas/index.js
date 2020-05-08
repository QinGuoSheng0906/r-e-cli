/*
   redux 中间件 saga
   秦国胜
   2018-08-12
*/
import { takeEvery } from 'redux-saga/effects'
import { ASNYJOB, ASNYJOB1 } from '../actions/actionTypes'

import getJob from './job'

//导出的mySaga需要写成一个Generator函数，异步处理函数getInitList也应是Generator函数
function* mySaga () {
   // 拦截对应actionTpe 的 action 
   yield takeEvery(ASNYJOB, getJob.getJob)
   yield takeEvery(ASNYJOB1, getJob.getJob2)
}
 
export default mySaga
