/*
* 用户登录相关
*/
import axios from '@/lib/http/axios';
import { message } from 'antd';

import { UPDATE_USERINFO } from '../action-type/userinfo';
import { updateSpin } from './spinInfo';

// 更新用户登录信息
function updateUserinfo (data) {
   return {
      type: UPDATE_USERINFO,
      data
   }
}

function userinfoData (data, cb) {
   return function (dispatch) {
      dispatch(updateSpin({
         loading: true
      }));
      axios({
         url: 'login',
         data,
         method: 'POST'
      }).then((res) => {
         dispatch(updateSpin({
            loading: false
         }));
         cb && cb(res);
      }).catch((err) => {
         dispatch(updateSpin({
            loading: false
         }));
         message.error(err.msg);
      });
   };
}


export {
   updateUserinfo,
   userinfoData
}