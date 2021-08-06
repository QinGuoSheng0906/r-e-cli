/*
 * @Descripttion: 开发环境
 * @version: webpack - excrise
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-10-27 16:09:00
 * @LastEditTime: 
*/

const path = require('path');
const PATHS = require('../PATHS');
const webpack = require('webpack');
const { merge } = require('webpack-merge'); // 链接公共配置
const COMMON = require('./common'); // 公共配置

// 模块提供了中间缓存 提高构建速度
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); 

// 打包输出文件信息
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const devServer = {
   contentBase: path.resolve(PATHS.dist),
   host: '0.0.0.0',
   port: 9999,
   historyApiFallback: true,
   overlay: {
      errors: false//当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
   },
   quiet: false, // 控制台不输出打包信息
   inline: true, // 使用inline的方式进行页面自动刷新
   open: false, // 不自动打开浏览器
   hot: true,
   progress: false,
   clientLogLevel: 'none', // 不在浏览器控制台输出错误
   // 代理
   proxy: {
      '/api/*': {
         target: 'http://localhost:8888/',
         changeOrigin: false,
         secure: false,
         pathRewrite: {
            '^/api': ''
         }
      }
   }
}

module.exports = merge(
   COMMON,
   {
      /* 模式 */
      mode: 'development',
      /* sorce-map */
      devtool : 'cheap-module-eval-source-map',
      /* 插件 */
      plugins: [
         new webpack.HotModuleReplacementPlugin(),	// 热更新
         // 打包日志优化
         new FriendlyErrorsWebpackPlugin({
            // 运行成功
            compilationSuccessInfo: {
               message: 'http://localhost:9999/',
               notes: [ 'http://localhost:9999/' ]
            }
         })
         // 提升编译速度
         // new HardSourceWebpackPlugin()
      ],
      devServer
   }
);
