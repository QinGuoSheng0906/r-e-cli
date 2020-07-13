/*
   base.config.js 开发环境和生产环境都需要使用的配置
   秦国胜
   2019-08-05
*/
const path = require('path');
const webpack = require('webpack');

//HTML 模版
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 自动dll
// const AutoDllPlugin = require('autodll-webpack-plugin'); // 第 1 步：引入 DLL 自动链接库插件

//清理本地打包文件
const { CleanWebpackPlugin }= require('clean-webpack-plugin');

//这个插件可以将样式文件从bundle.js抽离出来一个文件，并且支持chunk css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//多线程打包
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 3 });

// 去除无用的样式
// const glob = require('glob');
// const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
module.exports={
   //输入
   entry: {
      main: [ path.resolve(__dirname,'../app/index.jsx') ]
   },
   //输出
   output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[name].js'
   },
   // 只在发生错误或有新的编译时输出 // errors-only minimal
   stats: 'errors-only',
   //loader 配置
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            include: [ path.resolve('./app') ],// 限定范围
            use:[ 'happypack/loader?id=babel','babel-loader?cacheDirectory' ]
         },
         {
            test: /\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: 'cache-loader',
                  options: {
                     cacheDirectory: path.resolve(__dirname, '../.cache-loader')
                  }
               },
               //'style-loader',
               'css-loader',
               'postcss-loader'
            ]
         },
         {
            test: /\.less$/,
            use: [
               MiniCssExtractPlugin.loader,
               //'style-loader',
               {
                  loader: 'cache-loader',
                  options: {
                     cacheDirectory: path.resolve(__dirname, '../.cache-loader')
                  }
               },
               'css-loader',
               'postcss-loader',
               {
                  loader:'less-loader?sourceMap=true',
                  options:{
                     lessOptions: {
                        javascriptEnabled: true
                     } 
                
                     // javascriptEnabled: true
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
                     limit: 50000,
                     name: 'images/[name].[hash:8].[ext]',
                     publicPath: '../'
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
      new HtmlWebpackPlugin({
         title: 'q-react-cli',
         template: path.resolve(__dirname, '../public/index.html'),
         favicon: path.resolve(__dirname, '../public/favicon.ico') // 添加小图标
         // minify: {
         //    html5: true,
         //    collapseWhitespace: true, //去除空格
         //    preserveLineBreaks: false, //去除换行
         //    minifyCSS: true,
         //    minifyJS: true,
         //    removeComments: false //去除注释
         // }
      }),
      //每次打包 清除 dist 目录 生成新的
      new CleanWebpackPlugin(),
      //css less 抽离
      new MiniCssExtractPlugin({
         filename: 'styles/[name].[hash:4].css',
         chunkFilename:'styles/[name].[hash:4].css'
      }),
      // // 去除无用的样式
      // new PurgecssWebpackPlugin({
      //    paths: glob.sync(path.join(__dirname, '../app/**/*'), { nodir: true })
      // }),
      // 多线程打包
      new HappyPack({
         // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
         id: 'babel',
         // 如何处理 .js 文件，用法和 Loader 配置中一样
         loaders: [ 'babel-loader?cacheDirectory=true' ],
         //使用共享进程池中的自进程去处理任务
         threadPool: happyThreadPool,
         //是否允许happypack输出日志，默认true
         verbose: false
      }),
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
      modules: [ path.resolve(__dirname, '../app'), path.resolve('node_modules') ],
      alias: {
         '@': path.resolve(__dirname, '../app'),
         '@assets': path.resolve(__dirname, '../app/assets'),
         '@components': path.resolve(__dirname, '../app/components'),
         '@pages': path.resolve(__dirname, '../app/pages/'),
         '@lib': path.resolve(__dirname, '../app/lib'),
         '@actions': path.resolve(__dirname, '../app/actions')
      },
      enforceExtension: false,
      extensions: [ '.js', '.jsx',  '.css', '.less' , '.json' ]
   }
};
