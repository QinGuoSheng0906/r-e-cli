/*
   整合合并  reucer加工函数
   秦国胜
   2019-12-05
*/
import { combineReducers } from 'redux';

import spinInfo from './spinInfo'; // loading 状态
import userinfo from './userinfo';


// 创建规则
export  default combineReducers({
   spinInfo,
   userinfo
});
