/*
*  常用正则
*/
// 清楚前后空格
const trim = /(^\s*)|(\s*$)/g;
// 验证手机号
const phone = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/; 
// 判断是否是数字
const intNumber = /^[0-9]*[1-9][0-9]*$/; 
// 带小数点
const floatNumber = /^[1-9][0-9]*([.][0-9]+)?$/; 
// 英文和中文
const letterChinese = /^[a-zA-Z\u4e00-\u9fa5]+$/; 
// 字母、数字和中文
const letterNumChinese = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/; 
// 字母、数字、中文 和 特殊字符
const letterNumChineseChar =  /^[a-zA-Z0-9\u4e00-\u9fa5,（）().·]+$/; 
// 用户名正则，4到16位（字母，数字，下划线，减号）
const userName =  /^[a-zA-Z0-9_-]{4,16}$/; 
// 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
// const password = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[-,!@#$%^&*?]).*$/;
const password = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
// 邮箱
const email = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/; 
// URL正则

// 微信号
const weChat = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;

// 车牌
let carNumbers = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
// 新能源车牌
let carEnergyNumbers = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
// 车牌验证，包含新能源汽车 大型新能源车
let carNweNum = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/

// 清楚前后空格
function clearTrim (str) {
   str = str.replace(trim, '')
   return str
}
// 身份证验证
function idCardVerify (idcard) {
   let errors = [ true, '身份证号码位数不对', '身份证号码出生日期超出范围或含有非法字符', '身份证号码非法', '身份证地区非法' ]
   let area = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: 'xinjiang',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
   }
   let Y,JYM, S,  M,
      idcard_array = [],
      ereg;
   idcard_array = idcard.split('')
   // 地区检验
   if (area[parseInt(idcard.substr(0, 2))] === null) return errors[4]
   switch (idcard.length) {
   // case 15:
   //   if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
   //     ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/ // 测试出生日期的合法性
   //   } else {
   //     ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/ // 测试出生日期的合法性
   //   }
   //   if (ereg.test(idcard)) {
   //     return errors[0]
   //   } else {
   //     return errors[2]
   //   }
   case 18:
      if (parseInt(idcard.substr(6, 4)) % 4 === 0 || (parseInt(idcard.substr(6, 4)) % 100 === 0 && parseInt(idcard.substr(6, 4)) % 4 === 0)) {
         ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/ // 闰年出生日期的合法性正则表达式
      } else {
         ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/ // 平年出生日期的合法性正则表达式
      }
      if (ereg.test(idcard)) { // 测试出生日期的合法性
         // 计算校验位
         S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3
         Y = S % 11
         M = 'F'
         JYM = '10X98765432'
         M = JYM.substr(Y, 1) // 判断校验位
         if (M === idcard_array[17]) return errors[0] // 检测ID的校验位
         else return errors[3]
      } else return errors[2]
   default:
      return errors[1]
   }
}

export {
   trim,
   idCardVerify,
   clearTrim,
   phone,
   intNumber,
   floatNumber,
   email,
   carNumbers,
   carEnergyNumbers,
   carNweNum,
   letterChinese,
   letterNumChinese,
   letterNumChineseChar,
   userName,
   password,
   weChat
}
