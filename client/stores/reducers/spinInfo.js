/*
* 全局通用loading
*/

//导入action常量
import { UPDATE_LOADING } from '../action-type/spinInfo';

//初始化state
const INIT_STATE = {
   'loading': false, // loading
   'loadingPage': false, // 加载页面
   'loadingTable': false, // 表格加载
   'loadingForm': false, // 表单加载
   'loadingModal': false, // 模态窗口加载
   'loadingMinAuditor': false, // 模态窗口加载
   'onOff': true, // 防止多次重复连续请求
   'modalTip': '', //提示信息
   'pageWarn': '', //警告信息,
   'auth': 0, //查看权限
   'customeAddFormSpin': false, //新增客户主体表单
   'isReload': true, // 是否刷新 默认刷新
   'loadingDealModal': false // 是否刷新 默认刷新
};

export default function (state = INIT_STATE, action) {
   switch (action.type) {
   case UPDATE_LOADING:
      return Object.assign({}, state, action.data);
   default:
      return state;
   }
}