/*
 * @Descripttion: 存储环境变量
 * @version: webpack - excrise
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-10-28 09:51:00
 * @LastEditTime: 
*/
module.exports = {
   development: {
      PROCESS_ENV: 'development',
      TITLE: '开发环境-',
      BASE_URL: 'http://113.204.6.164:9102/'
   },
   acceptance: {
      PROCESS_ENV: 'acceptance',
      TITLE: '测试环境-',
      BASE_URL: 'http://113.204.6.164:9102/'
   },
   preannouncement: {
      PROCESS_ENV: 'preannouncement',
      TITLE: '预发环境-',
      BASE_URL: 'http://119.3.241.255:36010/'
   },
   production: {
      PROCESS_ENV: 'production',
      TITLE: '',
      BASE_URL: 'https://api.cartechfin.com/'
   }
}; 