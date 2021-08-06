/*
   常用工具封装
   秦国胜
*/

// 金钱的保留两位小数，3位隔开
const moneyFormat = (money, point) => {
   point = point > 0 && point <= 20 ? point : 2
   let isNegative = false
   if (money < 0) {
      money = Math.abs(money)
      isNegative = true
   }
   money =
        parseFloat((money + '').replace(/[^\d.-]/g, '')).toFixed(point) + ''
   let l = money
      .split('.')[0]
      .split('')
      .reverse()
   let r = money.split('.')[1]
   let result = ''
   for (let i = 0; i < l.length; i++) {
      result += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '')
   }
   return (
      (isNegative ? '-' : '') +
        result
           .split('')
           .reverse()
           .join('') +
        '.' +
        r
   )
}

//  手机格式化 中间****号 isStar 是否星号替换 默认需要
const phoneFormat = (phone, isStar = true) => {
   if(!phone) return ''
   phone += '' 
   if (isStar) {
      return `${phone.substring(0, 3)} ${'*'.repeat(phone.length - 7)
         .replace(/(.{4})/g, '$1 ')}${phone.length % 11 ? ' ' : ''}${phone.slice(-4)}`;
   } else {
      return phone.replace(/\s/g,'').replace(/(^\d{3})(?=\d)/g,'$1 ').replace(/(\d{4})(?=\d)/g,'$1 ');
   }
}

// 银行卡格式化 后四位显示 isStar 是否星号替换 默认需要
const bankFormat = (bankNum, isStar = true) => {
   if(!bankNum) return ''
   bankNum += '';
   if (isStar) {
      return `${bankNum.substring(0, 4)} ${'*'.repeat(bankNum.length - 8)
         .replace(/(.{4})/g, '$1 ')}${bankNum.length % 4 ? ' ' : ''}${bankNum.slice(-4)}`;
   } else {
      bankNum = bankNum.replace(/(\s)/g,'').replace(/(\d{4})/g,'$1 ').replace(/\s*$/,'');
      return bankNum
   }
}

// 时间戳 格式化 link 链接符默认'-' YYYY-MM-DD HH:MM:SS 和 YYYY-MM-DD condition 返回内容 date 返回日期 time 返回日期加时分秒 
const dateFormat = ({ time, link = '-', condition = 'date' }) => {
   if (!time) return;
   let newDate = new Date(time);
   let opt = {
      y: newDate.getFullYear(),
      m: newDate.getMonth() + 1,
      d: newDate.getDate(),
      H: newDate.getHours(),
      M: newDate.getMinutes(),
      S: newDate.getSeconds()
   }
   // 添加 0
   for(let i in opt) {
      opt[i] =  opt[i] < 10 ? '0' + opt[i] : opt[i] 
   }

   if (condition === 'date') {
      return opt.y + link + opt.m + link + opt.d
   } else {
      return opt.y + link + opt.m + link + opt.d + ' ' + opt.H + ':' + opt.M + ':' + opt.S
   }
}

// 判断类型
const isType = para => Object.prototype.toString.call(para).match(/\[([^]*)\]/)[1].split(' ')[1]

// 回滚回顶部
const scrollTop = () => {
   if (window.scrollTo) {
      let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
      window.scrollTo(0, Math.max(scrollHeight - 1, 0))
      return
   }
   if (document.documentElement && document.documentElement.scrollTop) {
      document.documentElement.scrollTop = 0
      return
   }
   if (document.body && document.body.scrollTop) {
      document.body.scrollTop = 0
      return
   }
   if (window.pageYOffset) {
      window.pageYOffset = 0
      return
   }
}

// 数组去重 根据值遍历 去重数组对象时的判断条件 condition
const arrayToHeavy = ({ arry = [], condition }) => {
   if (arry.length <= 0) return
   let result = []
   let obj = []
   for (let item of arry) {
      if (condition) {
         if (!obj[item[ condition ] ]) {
            result.push(item)
            obj[item[ condition ]] = 1
         }
      } else {
         if (!obj[item]) {
            result.push(item)
            obj[item] = 1
         }
      }
   }
   return result
}

// 导出文件
const expExcel = (data, name) => {
   const blob = new Blob([ data ])
   const fileName = `${name}.xls`
   if ('download' in document.createElement('a')) { // 非IE下载
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
   } else { // IE10+下载
      navigator.msSaveBlob(blob, fileName)
   }
}


/* 表单布局 */
function layoutForm (label = 6, wrapper = 18 ) {
   return {
      labelCol: {
         span: label
      },
      wrapperCol: {
         span: wrapper
      }
   };
}

// 解析 xss 转义
function HTMLDecode (text) {
   let temp = document.createElement('div');
   temp.innerHTML = text;
   let output = temp.innerText || temp.textContent;
   temp = null;
   return output;
}

/**
 * 序列化化数据
 * @param  {Object} data 数据对象
 * @return {String}      URL用数据
 */
function serialize (data) {
   let str = '';
   for (let key in data) {
      str += key + '=' + encodeURIComponent(data[key]) + '&';
   }
   str = str.replace(/&$/, '');
   return str;
}

/**
 * 查询是否为空对象
 * @param  {Object}  obj 查询对象
 * @return {Boolean}     查询结果
 */
function isObjEmpty (obj) {
   // Speed up calls to hasOwnProperty
   let hasOwnProperty = Object.prototype.hasOwnProperty;

   // null and undefined are "empty"
   if (obj == null) return true;

   // Assume if it has a length property with a non-zero value
   // that that property is correct.
   if (obj.length > 0) return false;
   if (obj.length === 0) return true;

   // If it isn't an object at this point
   // it is empty, but it can't be anything *but* empty
   // Is it empty?  Depends on your application.
   if (typeof obj !== 'object') return true;

   // Otherwise, does it have any properties of its own?
   // Note that this doesn't handle
   // toString and valueOf enumeration bugs in IE < 9
   for (let key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
   }

   return true;
} 

/*
 * 获取Cookie
*/
function getCookie (cookieName) {
   let strcookie = document.cookie;//获取cookie字符串
   let arrcookie = strcookie.split('; ');//分割
   //遍历匹配
   for ( let i = 0; i < arrcookie.length; i++) {
      let arr = arrcookie[i].split('=');
      if (arr[0] == cookieName){
         return arr[1];
      }
   }
   return '';
}

export {
   moneyFormat,
   phoneFormat,
   bankFormat,
   dateFormat,
   isType,
   scrollTop,
   arrayToHeavy,
   expExcel,
   layoutForm,
   HTMLDecode,
   serialize,
   isObjEmpty,
   getCookie
}
