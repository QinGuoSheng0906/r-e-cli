/*
 * @Descripttion: 路由菜单配置
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-11-02 14:47:00
 * @LastEditTime: 
*/


/*
* 配置参数
* {
*     isUnfold: false,                  // 是否默认展开  true 展开             false 不展开
*     isShow: true,                     // 是否显示该项  true 不显示           false 显示
*     isExact: true,                    // 是否完全匹配  true 不完全匹配       false 完全匹配
*     rightControl: '6',                // 权限控制等级
*     title: '登录',                    // 标题
*     name: 'login',                    // 名字
*     path: '/login'                    // 路由跳转url
*     component: '/login'               // 组件地址
*     children: []                      // 出现表示该级为二级导航菜单
* }
*/

import asyncComponent from './asyncComponent'; // 按需加载

const navigation = [
   {
      isUnfold: false,                  // 是否默认展开  true 展开      false 不展开
      isShow: true,                     // 是否显示该项  true 不显示    false 显示
      rightControl: '6',                // 权限控制等级
      icon: 'home',                     // 菜单图标
      title: '菜单一',                  // 标题
      children: [
         {
            isUnfold: true,
            isShow: true,
            rightControl: '6',
            icon: 'home',
            title: '首页',
            name: 'home',
            path: '/client/home',
            component: asyncComponent(() => import('@pages/home'))
         },
         {
            isUnfold: true,
            isShow: true,
            rightControl: '6',
            icon: 'home',
            title: '列表',
            name: 'list',
            path: '/client/list',
            component: asyncComponent(() => import('@pages/list'))
         },
         {
            isUnfold: true,
            isShow: true,
            rightControl: '6',
            icon: 'home',
            title: '列表详情',
            name: 'detail',
            path: '/client/list/detail',
            component: asyncComponent(() => import('@pages/list/detail'))
         }
      ]
   }
];

// 添加key 防止添加错误
let initMenuData = (routerConfig) => {
   let init = (routers,parentKey) => {
      routers.forEach((item,index) => {
         item.key = parentKey + index
         if (item.children && item.children.length > 0) {
            init(item.children, item.key + '-')
         }
      })
   }
   init(routerConfig,'');
   return routerConfig;
}



export default initMenuData(navigation);