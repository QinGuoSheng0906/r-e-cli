/*
   路由配置
   秦国胜
   2019-12-9
*/
import Loadable from './loadable'                           // 按需加载

// 菜单路由导航
const menus = [
   {
      isMenu: true,                     // 是否是下拉 true 不是 false 是 默认下拉
      isShow: true,                     // 是否显示  true  不显示 false 显示
      rightControl: '6',                // 权限控制
      icon: 'home',                     // 图标
      title: '首页',                    // 标题
      name: 'list',
      path: '/home',                    // 路由
      component: Loadable(() => import('@/pages/home'))
   },
   {
      rightControl: '6',                // 权限控制
      icon: 'home',                     // 图标
      title: '列表',                    // 标题
      name: 'list',
      children: [
         {
            isShow: true,                   
            rightControl: '6',                
            icon: 'home',                     
            title: '车列表',  
            name: 'carList',                 
            path: 'list/carList',       
            component: Loadable(() => import('@/pages/carList'))
         },
         {
            isShow: true,                   
            rightControl: '6',                
            icon: 'home',                     
            title: '城市列表',  
            name: 'cityList',                 
            path: 'list/cityList',       
            component: Loadable(() => import('@/pages/cityList'))
         }
      ]
   }
]

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
   init(routerConfig,'')
}
initMenuData(menus)

export default menus
