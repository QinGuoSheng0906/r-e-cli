/*
 * @Descripttion: 生产环境
 * @version: webpack - excrise
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-10-27 16:09:00
 * @LastEditTime: 
*/

// const path = require('path');
// const PATHS = require('../PATHS');
// const webpack = require('webpack');
const { merge } = require('webpack-merge'); // 链接公共配置
const COMMON = require('./common'); // 公共配置

// 压缩 CSS 代码
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 会覆盖webpack默认提供的规则,,比如不会再压缩 JS 代码，需要该插件
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Gzip 压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = [ 'js', 'jsx', 'less', 'css', 'json', 'txt', 'html','ico','svg','png','jpg' ];

// 打包进度耗时分析
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();




const watchConfig = process.env.PROCESS_ENV === 'watch' ? {
   watch:true, //监控代码变化
   watchOptions:{
      poll:1000,   //  每秒询问我 100次
      aggregateTimeout:500,   // 防抖  我一直输入代码 他不更新 当我停止后他才更新 
      ignored:/node_modules/ // 不需要监控的文件
   }
} : {};
module.exports = smp.wrap(merge(
   COMMON,
   watchConfig,
   {
      /* 模式 */
      mode: 'production',
      devtool:'cheap-module-source-map',
      /* 分割*/
      optimization: {
         usedExports: true, // 不导出模块中未使用的代码
         minimizer: [
            // new UglifyJsPlugin({
            //    sourceMap: true,
            //    parallel: true  // 启用多线程并行运行提高编译速度
            // }),
            new OptimizeCSSAssetsPlugin({
               // 引入css 规则
               cssProcessor: require('cssnano'),
               cssProcessorPluginOptions: {
                  preset: [  'default', {
                     discardComments: { removeAll: true }, //对注释的处理
                     normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
                  } ]
               },
               canPrint: false  // 是否打印处理过程中的日志
            })
         ],
         splitChunks:{
            chunks: 'all',
            minSize: 0,       // 默认30000（30kb），但是demo中的文件都很小，minSize设为0，让每个文件都满足大小条件
            name: true,       // 拆分出来块的名字，默认由块名和 hash 值自动生成，此选项可接收 function
            cacheGroups: {
               vendor: {      // nodeModules 代码单独打包成一个 chunk 输出
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial',
                  name: 'vendor'
               },
               commons: {	  // 多次import的文件打包成一个单独的common.js
                  chunks: 'initial',
                  minChunks: 2,
                  maxInitialRequests: 5,
                  name: 'common'
               }
            }
         }
      },
      /* models */
      module: {
         rules: []
      },
      /* 插件 */
      plugins: [
         new CompressionWebpackPlugin({
            // 开启gzip压缩
            algorithm: 'gzip', // 压缩算法
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), 
            threshold: 10240, // 仅处理大于此大小的资源（以字节为单位）
            minRatio: 0.8 // 压缩比大于此值才处理
         })
      ]
   }
));