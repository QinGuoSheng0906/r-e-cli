/*
 * @Descripttion: 存储路径
 * @version: webpack - excrise
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-10-27 16:05:00
 * @LastEditTime: 
*/
const path = require('path');

module.exports = {
   client: path.resolve(__dirname, '../client'),
   dist: path.resolve(__dirname, '../client/dist'),
   public: path.resolve(__dirname, '../client/public')
}; 