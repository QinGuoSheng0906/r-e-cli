/*
 * @Descripttion: 登录页
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-10-29 14:47:00
 * @LastEditTime: 
*/
import React, { useState, useEffect, useRef  } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userinfoData } from '@/stores/actions/userinfo';
import { getLoginCode } from '@/stores/actions/captcha';

import { layoutForm, getCookie } from '@lib/utils';
import { phone } from '@lib/reg';

import { Form, Button, Spin } from 'antd';

import Login from './login'; // 登录
import Register from './register'; // 注册
import ForgetPassword from './forget-password'; // 注册

import './style.less';

function LoginRegisterPassword (props) {
   const { dispatch, spinInfo } = props;
   const codeRef = useRef('');// 验证码cookie
   const codeType = useRef('login');// 验证码cookie
   const [ switchData, setSwitchData ] = useState ({
      type: 'login',
      title: '登录'
   });
   const  [ codeSvg, setCodeSvg ] = useState (''); // 验证码svg
   const  [ codeLoading, setCodeLoading ] = useState (false); // 验证码Loading
   // 获取验证码
   const getCode = () => {
      setCodeLoading(true);
      dispatch(getLoginCode({
         width: '100'
      }, (res) => {
         setCodeLoading(false);
         setCodeSvg(res.data);
         codeRef.current = getCookie('loginCode');
      }));
   }

   useEffect(() => {
      document.title = '登录';
      getCode();
   }, []);

   // 登录
   const onFinish = values => {
      if (values.userName.length == 11 && phone.test(values.userName) ) {
         values.phone = values.userName;
         delete values.userName;
      }
      dispatch(userinfoData(values, (res) => {
         console.log('res', res);
      }));
   }

   // 切换组件
   const switchComponents = (type) => {
      codeType.current = type;
      switch(type){
      case 'login' : 
         document.title = '登录';
         setSwitchData({
            type: 'login',
            title: '登录'
         });
         break;
      case 'register' : 
         document.title = '注册';
         setSwitchData({
            type: 'register',
            title: '注册'
         });
         break;
      case 'password' : 
         document.title = '忘记密码？';
         setSwitchData({
            type: 'password',
            title: '忘记密码？'
         });
         break;
      default:
         break;
      }
   }
   
   return(
      <div className = 'login'>
         <div className = 'layout-position-center login-container '>
            <Spin  delay = { 100 } spinning = { spinInfo.loading }>
               <h3 className = 'login-title f-s-24'>{switchData.title}</h3>
               <div className = 'login-form'>
                  <Form 
                     { ...{
                        ...layoutForm(5, 18),
                        initialValues:{
                           remember: true
                        },
                        onFinish: onFinish
                     }}
                  >
                     {
                        switchData.type == 'login' ? 
                           <Login 
                              {...{
                                 codeSvg,
                                 codeLoading,
                                 getCode
                              }}
                           /> : ''
                     }
                     {
                        switchData.type == 'register' ? 
                           <Register 
                              {...{
                                 codeSvg,
                                 codeLoading,
                                 getCode
                              }}
                           /> : ''
                     }
                     {
                        switchData.type == 'password' ? 
                           <ForgetPassword /> : ''
                     }
                  

                     <div className = 't-c'>
                        <Button type = 'primary' htmlType = 'submit' className = 'submit-btn'>提&nbsp;&nbsp;&nbsp;&nbsp;交</Button>
                     </div>
                     <div className = 'f-c m-t-20 login-footer'>
                        {
                           switchData.type != 'login' ?
                              <div className = 'f-l login-register' onClick = { () => switchComponents('login') }>登录</div>
                              : ''
                        }
                        {
                           switchData.type != 'register' ?
                              <div className = { switchData.type == 'login' ? 'f-l login-register' : 'f-r login-password' } 
                                 onClick = { () => switchComponents('register') }
                              >注册</div>
                              : ''
                        }
                        {
                           switchData.type != 'password' ? 
                              <div className = 'f-r login-password' onClick = { () => switchComponents('password') }>忘记密码？</div>
                              : ''
                        }
                     </div>
                  </Form>
                 
               </div>
            </Spin>
         </div>
      </div>
   );
}

LoginRegisterPassword.propTypes = {
   spinInfo: PropTypes.object,
   userinfo: PropTypes.object,
   dispatch: PropTypes.func
};

// 读取数据 映射状态管理的数据 其实也就是把Redux中的数据映射到React中的props中去。
function mapProps (state){
   return {
      userinfo: state.userinfo,
      spinInfo: state.spinInfo
   };
}
// 设置数据 把各种dispatch也变成了props让你可以直接使用
// function mapDispatch (dispatch) {
//    return {
//      getLoginCode: data => dispatch(Citys.newCity(data)),
//    };
// }

export default connect(
   mapProps
)(LoginRegisterPassword);