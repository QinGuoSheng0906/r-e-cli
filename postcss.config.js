/*
   postcss.config.js css前缀添加
   秦国胜
   2019-12-24
*/
module.exports = {
   plugins: [
      require('autoprefixer')({
         'overrideBrowserslist': [
            'defaults',
            'not ie < 11',
            'last 2 versions',
            '> 1%',
            'iOS 7',
            'last 3 iOS versions'
         ]
      })
      // rem  自动换算
      // require('postcss-plugin-px2rem')({
      //    rootValue: 75,// 配合lib-flexible使用 750的设计稿
      //    unitPrecision: 5,
      //    mediaQuery: true,
      //    exclude: /(node_module)/i,
      //    selectorBlackList: [ 'html', 'mint-', 'mt-', 'mpvue-', 'calendar', 'iconfont' ], //在rem.js全局作用下   排除指定的文件的影响
      //    propBlackList: [ 'border' ] //过滤属性
      // })
   ]
};