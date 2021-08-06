/**
 * axios请求
 * @param  {String} path   请求路径
 * @param  {Object} data   请求参数
 * @param  {String} method 请求类型
 * @param  {Object} opts   请求选项
 * @return {Object}        Promise对象
 */

import Axios from 'axios';
import URLS from '../../api/api';
import { serialize } from '@lib/utils';

// 接口白名单
const whiteList = [ '' ]

/* eslint-disable no-unused-vars */ 
const isInWhiteList = function (url) {
   let flag = false
   whiteList.forEach(function (e) {
      if (url.indexOf(e) >= 0) {
         flag = true
      }
   })
   return flag
}

// 超时时间
Axios.defaults.timeout = 30000;

Axios.defaults.headers.post['Content-Type'] = 'application/json';

// 请求地址
// Axios.defaults.baseURL = isLocalDev === true ? '' : config[process.env.PROCESS_ENV].BASE_URL

// 请求拦截
Axios.interceptors.request.use(
   config => {
      // if (!isInWhiteList(config.url)) {}
      console.log('config', config);
      return config
   },
   err => {
      return Promise.reject(err)
   }
)

// 响应拦截
Axios.interceptors.response.use(
   response => {
      console.log('response', response.data);
      if (response.data.succeed) {
         return response.data
      } else {
         return Promise.reject(response.data)
      }
   },
   error => {
      return Promise.reject(error)
   }
);

function Ajax ({ url, data, method, opts }) {
   let path = URLS[url];
   if (!path) return Promise.reject(new Error('无效的API地址'));
   // let idReg = /:id/;
   // if (idReg.test(path)) {
   //    path = path.replace(idReg, data.id);
   //    delete data.id;
   // }
   method = method ? method.toLowerCase() : 'get';
   if (method == 'get'){
      path += (/\?/.test(path) ? '&' : '?') + serialize(data);
   }
   // 发送请求
   return Axios({
      url: path,
      method,
      data
   });
}

 
export default Ajax;