/*
   bable配置
   秦国胜
   2019-08-05
*/
module.exports = function (api) {
   api.cache(true);
   const presets = [
      [ '@babel/preset-env', 
         {
            'targets': {
               'browsers': [ '> 1%', 'last 2 versions', 'not ie <= 11' ]
            },
            'corejs': '2', 
            'useBuiltIns': 'usage',
            'debug': true
         },
         'react'
      ], 
      '@babel/preset-react'
   ];
   const plugins = [
      '@babel/plugin-syntax-dynamic-import',                                                 // babel 解析 import
      [ '@babel/plugin-proposal-class-properties', { 'loose': true } ],                      // class 类
      [ '@babel/plugin-transform-runtime', { 'corejs': 2 } ],                                // 支持ES6 按需转 ES5
      [ 'import', { 'libraryName': 'antd', 'libraryDirectory': 'es', 'style': 'css' } ],     // 按需加载antd的 样式
      'react-hot-loader/babel'                                                               // React 模块热替换
   ];
   return {
      presets,
      plugins
   };
};
