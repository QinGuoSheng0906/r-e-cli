/*
 * @Descripttion: 忘记密码
 * @Author: 秦国胜
 * @LastEditors: 秦国胜
 * @Date: 2020-12-15 15:00:00
 * @LastEditTime: 
*/

import React, { Component } from 'react';

import { password, phone } from '@lib/reg'; // 正则

import { Form, Input, Row, Col, Button } from 'antd';

const FormItem = Form.Item;
const InputPassword  = Input.Password;

class ForgetPassword extends Component {
   render () {
      return (
         <> 
            <FormItem 
               {... {
                  label: '手机号',
                  required: true
               }}
            >
               <Row gutter = { 8 }>
                  <Col span = { 18 }>
                     <FormItem
                        noStyle
                        {... {
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
                        <Input allowClear placeholder = '请输入手机号' />
                     </FormItem>
                  </Col>
                  <Col span = {6}>
                     <Button type = 'primary'>发送验证码</Button>
                  </Col>
               </Row>
            </FormItem>
            <FormItem 
               {... {
                    
                  label: '验证码',
                  name: 'code',
                  rules:[
                     {
                        required: true,
                        message: '请输入密码!'
                     }
                  ]
               }}
            >
               <Input allowClear placeholder = '请输入验证码' />
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
               <InputPassword  allowClear placeholder = '请输入密码' />
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
         </>
      )
   }
}
export default  ForgetPassword;