/*
   webpack.prod.config.js 生产环境配置
   秦国胜
   2019-08-05
*/
//const path = require('path');
const merge = require('webpack-merge');
//const webpack = require('webpack');
const baseWebpackConfig = require('./base.config');
//打包进度条
const ProgressBarPlugin=require('progress-bar-webpack-plugin');
//css 压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// js优化
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// js 压缩
const TerserPlugin = require('terser-webpack-plugin');
// 打包进度耗时分析
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
 
const smp = new SpeedMeasurePlugin();


module.exports= smp.wrap(merge(
   baseWebpackConfig,
   {
      mode: 'production',
      devtool:'cheap-module-source-map',
      optimization: {
         minimize: true,
         minimizer: [ new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            cache: true
         }) ],
         splitChunks: {
            chunks: 'all',         // 代码块类型 必须三选一： "initial"（初始化） | "all"(默认就是all) | "async"（动态加载）
            cacheGroups: {
               'statics/vender': {
                  test: /node_modules/,
                  filename: '[name].js',
                  chunks: 'initial',
                  minChunks: 1,
                  priority: 10,
                  minSize: 0,
                  enforce: true,
                  name: 'statics/vender'
               },
   
               'statics/commons': {
                  filename: '[name].js',
                  chunks: 'initial',
                  test: /common/,
                  minChunks: 1,
                  minSize: 0,
                  name: 'statics/commons',
                  enforce: true
               },
   
               'statics/components': {
                  filename: '[name].js',
                  chunks: 'initial',
                  test: /components/,
                  minChunks: 1,
                  minSize: 0,
                  name: 'statics/compoents',
                  enforce: true
               }
            }
         }
      },
      // 代码否分割
      plugins: [
         // 打包进度条
         new ProgressBarPlugin(),
         // css 压缩
         new OptimizeCSSAssetsPlugin ({
            // 引入css 规则
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
               preset: [  'default', {
                  discardComments: { removeAll: true }, //对注释的处理
                  normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
               } ]
            },
            canPrint: true  // 是否打印处理过程中的日志
         }),
         // js优化
         new WebpackParallelUglifyPlugin({
            uglifyJS: {
               output: {
                  beautify: false, //不需要格式化
                  comments: false //不保留注释
               },
               compress: {
                  drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                  collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                  reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
               },
               warnings: false // 在UglifyJs删除没有用到的代码时不输出警告
            }
         })
      ]
   }
));