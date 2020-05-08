import { put } from 'redux-saga/effects'
import { Job } from '../actions/index';

function* getJob () {
   let job = [
      { code: '01',jobName: '财务' }
   ]
   const action = Job.newJob(job)
   // put相当于dispatch这个新的action
   yield put(action)
}

function* getJob2 () {
   // 做发起请求
   let job = [
      { code: '01',jobName: '清洁工' }
   ]
   const action = Job.newJob(job)
   // put相当于dispatch这个新的action 存储数据
   yield put(action)
}

export  default {
   getJob,
   getJob2
}
