/*
 * @Descripttion: 注册
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-12-15 15:00:00
 * @LastEditTime: 
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { password, phone } from '@lib/reg'; // 正则

import { Form, Input, Select, Row, Col, Spin } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const InputPassword  = Input.Password;

class Register extends Component {
   render () {
      const prefixSelector = (
         <FormItem 
            name = 'prefix' 
            noStyle
            initialValue = '86'
         >
            <Select
               style = {{
                  width: 70
               }}
            >
               <Option value = '86'>+86</Option>
               <Option value = '87'>+87</Option>
            </Select>
         </FormItem>
      );
      let { codeSvg, codeLoading, getCode } = this.props;
      return (
         <> 
            <FormItem
               {... {
                  label: '账号',
                  name: 'username',
                  rules:[
                     {
                        required: true,
                        message: '请输入账号!'
                     }
                  ]
               }}
            >
               <Input placeholder = '请输入账号' />
            </FormItem>
            <FormItem 
               {... {
                  label: '设置密码',
                  name: 'newPassword',
                  rules:[
                     {
                        required: true,
                        message: '请输入密码!'
                     },
                     {
                        pattern: password,
                        message: '最少6位，至少1个大写字母，小写字母和数字!'
                     }
                  ]
               }}
            >
               <InputPassword allowClear placeholder = '请输入密码' />
            </FormItem>
            <FormItem 
               {... {
                  label: '确认密码',
                  name: 'password',
                  rules:[
                     {
                        required: true,
                        message: '请输入确认密码!'
                     },
                     {
                        pattern: password,
                        message: '最少6位，至少1个大写字母，小写字母和数字!'
                     },
                     ({ getFieldValue }) => ({
                        validator (rule, value) {
                           if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve();
                           }
                           return Promise.reject('您输入的两个密码不匹配!');
                        }
                     })
                  ]
               }}
            >
               <InputPassword allowClear placeholder = '请输入密码' />
            </FormItem>
            <FormItem
               {... {
                  label: '手机号',
                  name: 'phone',
                  rules:[
                     {
                        required: true,
                        message: '请输入手机号!'
                     },
                     {
                        pattern: phone,
                        message: '手机号格式错误!'
                     }
                  ]
               }}
            >
               <Input allowClear addonBefore = { prefixSelector } placeholder = '请输入手机号' />
            </FormItem>
            <FormItem
               {... {
                  label: 'E-mail',
                  name: 'email',
                  rules:[
                     {
                        type: 'email',
                        message: '邮箱格式错误!'
                     }
                  ]
               }}
            >
               <Input allowClear placeholder = '请输入E-mail' />
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
                        rules = {[ { required: true, message: '请输入验证码!' } ]}
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
         </>
      )
   }
}

Register.propTypes = {
   codeSvg: PropTypes.string,
   codeLoading: PropTypes.bool,
   getCode: PropTypes.func
};


export default  Register;