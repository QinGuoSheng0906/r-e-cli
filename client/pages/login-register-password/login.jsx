/*
   登录
*/
/*
 * @Descripttion: 登录页
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-10-29 14:47:00
 * @LastEditTime: 
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Input, Checkbox, Row, Col, Spin  } from 'antd';

const FormItem = Form.Item;
const InputPassword  = Input.Password;

class Login extends Component {
   render () {
      let { codeSvg, codeLoading, getCode } = this.props;
      return (
         <>
            <FormItem 
               {... {
                    
                  label: '用户',
                  name: 'userName',
                  rules:[
                     {
                        required: true,
                        validator (_, value) {
                           if (!value || !value.trim()) {
                              return Promise.reject('请输入账号/手机号!')
                           }
                           return Promise.resolve();
                        }
                     }
                    
                  ]
               }}
            >
               <Input allowClear placeholder = '请输入账号/手机号登录' />
            </FormItem>
            <FormItem 
               {... {
                    
                  label: '密码',
                  name: 'password',
                  rules:[
                     {
                        required: true,
                        validator (_, value) {
                           if (!value || !value.trim()) {
                              return Promise.reject('请输入密码!')
                           }
                           return Promise.resolve();
                        }
                     }
                  ]
               }}
            >
               <InputPassword allowClear placeholder = '请输入密码' />
            </FormItem>

            <FormItem 
               {... {
                  label: '验证码',
                  required: true
               }}
            >
               <Row gutter = { 8 }>
                  <Col span = { 16 }>
                     <Form.Item
                        name = 'code'
                        noStyle
                        rules = {[ { 
                           required: true,
                           validator (_, value) {
                              if (!value || !value.trim()) {
                                 return Promise.reject('请输入验证码!')
                              }
                              return Promise.resolve();
                           }
                        } ]}
                     >
                        <Input allowClear placeholder = '请输入验证码' />
                     </Form.Item>
                  </Col>
                  <Col span = {8}>
                     <Spin delay = { 300 } spinning = {codeLoading}>
                        <div onClick = { getCode } className = 'login-code' dangerouslySetInnerHTML = {{ __html: codeSvg }} />
                     </Spin>
                  </Col>
               </Row>
            </FormItem>
            <Row>
               <Col span = { 18 } offset = { 5 }>
                  <FormItem 
                     {... {
                        name: 'remember',
                        valuePropName:'checked'
                     }}
                  >
                     <Checkbox> 记住密码 </Checkbox>
                  </FormItem>
               </Col>
                
            </Row>
         </>
      )
   }
}

Login.propTypes = {
   codeSvg: PropTypes.string,
   codeLoading: PropTypes.bool,
   getCode: PropTypes.func
};


export default  Login;