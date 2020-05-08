/*
   整合合并  reucer加工函数
   秦国胜
   2019-12-05
*/
import { combineReducers } from 'redux';

import citys from './city'
import jobs from './job'

// 创建规则
export  default combineReducers({
   citys,
   jobs
});
