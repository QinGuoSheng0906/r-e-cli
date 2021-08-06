/*
* 用户登录相关
*/

import { UPDATE_USERINFO } from '../action-type/userinfo';

//初始化state
let INIT_STATE = {
   userinfo: {}
};

export default function (state = INIT_STATE, action){
   switch (action.type) {
   case UPDATE_USERINFO :
      return {
         ...state,
         userinfo: action.data
      }
   default :
      return state;
   }
}