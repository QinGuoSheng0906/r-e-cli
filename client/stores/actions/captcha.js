/*
* 验证码
*/
import axios from '@/lib/http/axios';
import { message } from 'antd';

function getLoginCode (data, cb) {
   return function () {
      axios({
         url: 'login-code',
         data
      })
         .then((res) => {
            cb && cb(res)
         })
         .catch(() =>  {
            message.error('验证码获取失败');
         })
   };
}
export {
   getLoginCode
}