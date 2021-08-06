/*
 * @Descripttion: 公共 config 抽离
 * @version: webpack - excrise
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-10-27 16:09:00
 * @LastEditTime: 
*/

const path = require('path');
const PATHS = require('../PATHS');
const webpack = require('webpack');

//HTML 模版
const HtmlWebpackPlugin = require('html-webpack-plugin');

//清理本地打包文件
const { CleanWebpackPlugin }= require('clean-webpack-plugin');

//这个插件可以将样式文件从bundle.js抽离出来一个文件，并且支持chunk css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 样式检查
// const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

// 拷贝静态文件
// const CopyPlugin = require('copy-webpack-plugin');

// 体积分析
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


module.exports = {
   //输入
   // entry: {
   //    main: [ path.resolve(__dirname,'../../client/index.js') ]
   // },
   entry: {
      main: [
         'react-hot-loader/patch',
         path.resolve(__dirname,'../../client/index.js')
      ]
   },
   // 输出
   output: {
      path: path.resolve(__dirname, PATHS.dist),
      filename: 'js/[name].[hash:6].js',
      chunkFilename: 'js/[name].js',
      publicPath: '/'
   },
   //loader 配置
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude:  /(node_modules|bower_components)/,
            include: [ path.resolve(PATHS.client) ],// 限定范围
            //  use:[ 'babel-loader?cacheDirectory=true', 'eslint-loader' ],
            use: [
               {
                  loader: 'cache-loader',
                  options: {
                     cacheDirectory: path.resolve(__dirname, '../../.cache-loader')
                  }
               },
               {
                  loader:'thread-loader', // 开启多进程打包
                  options:{
                     workers:3
                  }
               },
               { 
                  loader: 'babel-loader' ,
                  options: {
                     cacheDirectory: true
                  }
               }, // options 在 .babelrc 定义
               {
                  loader:'eslint-loader' 
               }
            ],
            enforce: 'pre' // 编译前检查
         },
         {
            test: /\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'postcss-loader',
               'thread-loader'
            ]
         },
         {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: 'cache-loader',
                  options: {
                     cacheDirectory: path.resolve(__dirname, '../../.cache-loader')
                  }
               },
               'css-loader',
               'postcss-loader',
               {
                  loader:'less-loader?sourceMap=true',
                  options:{
                     javascriptEnabled: true
                  }
               },
               {
                  loader:'thread-loader', // 开启多进程打包
                  options:{
                     workers:3
                  }
               }
            ]
         },
         {
            test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
            use: [ 
               {
                  loader: 'url-loader',
                  options: {
                     limit: 8 * 1024,
                     esModule: false,    // 关闭默认 es模块引入方式
                     name: '[name].[contenthash:6].[ext]',
                     outputPath: 'images',
                     publicPath: '../images'
                  }
               }
            ]
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf|ico)$/,
            use: 'file-loader'
         }
      ]
   },
   //插件配置
   plugins: [
      //每次打包 清除 dist 目录 生成新的
      new CleanWebpackPlugin(),
      // new StylelintWebpackPlugin({
      //    context: 'client',
      //    configFile: path.resolve(__dirname,'../../.stylelintrc.js'),
      //    files: '**/*.(less|css)',
      //    failOnError: false,
      //    quiet: true,
      //    fix: true
      // }),
      new HtmlWebpackPlugin({
         title: 'webpack - excrise', 
         template: path.resolve( PATHS.public, 'index.html'),
         favicon: path.resolve(PATHS.public, 'favicon.ico'), // 添加小图标
         filename: path.resolve( PATHS.dist, 'index.html'),
         hash: true,
         minify: {
            html5: true,
            collapseWhitespace: true, //去除空格
            preserveLineBreaks: false, //去除换行
            minifyCSS: true,
            minifyJS: true,
            removeComments: false //去除注释
         }
      }),
      //css less 抽离
      new MiniCssExtractPlugin({
         filename: 'styles/[name].[contenthash:6].css',
         chunkFilename:'styles/[name].[contenthash:6].css'
      }),
      // new CopyPlugin({
      //    patterns: [
      //       {
      //          from: path.resolve(process.cwd(),'../../client/assets/fonts'),
      //          to:  path.resolve(process.cwd(),'../../client/dist/fonts')
      //       }
      //    ]
      // })
      // 全局环境变量
      new webpack.DefinePlugin({
         'process.env': {
            PROCESS_ENV: JSON.stringify(process.env.PROCESS_ENV)
         }
      })
   ],
   // 设置别名
   resolve: {
      // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
      modules: [ path.resolve(__dirname, '../../client'), path.resolve('node_modules') ],
      alias: {
         '@': path.resolve(__dirname, '../../client'),                             // 客户端目录
         '@api': path.resolve(__dirname, '../../client/api'),                      // 请求api
         '@assets': path.resolve(__dirname, '../../client/assets'),                // 静态文件
         '@styles': path.resolve(__dirname, '../../client/assets/styles'),         // 样式
         '@images': path.resolve(__dirname, '../../client/assets/images'),         // 静态图片
         '@components': path.resolve(__dirname, '../../client/components'),        // 组件
         '@pages': path.resolve(__dirname, '../../client/pages'),                  // 页面
         '@lib': path.resolve(__dirname, '../../client/lib'),                      // 
         '@enums': path.resolve(__dirname, '../../client/lib/enums'),              // 枚举值
         '@actions': path.resolve(__dirname, '../../client/stores/actions'),       // 状态管理
         '@reducers': path.resolve(__dirname, '../../client/stores/reducers'),
         'react-dom': '@hot-loader/react-dom'
      },
      enforceExtension: false,
      extensions: [ '.js', '.jsx',  '.css', '.less' , '.json' ]
   }
}