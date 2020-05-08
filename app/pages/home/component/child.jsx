import React, { useState, useEffect } from 'react'

function Child () {
   const [ num, setNum ] = useState(99)
   function aa () {
      setNum(num+1)
   }
   // 处理副作用 componentDidMount、componentDidUpdate 和 componentWillUnmount
   useEffect(() => {
      console.log('effect')
      setNum(88)
      // 清除副作用 effect 返回一个函数，React 将会在执行清除操作时调用它
      return () => {
         console.log('清除副作用')
      }
   //}, [ num ]) // 仅在更新的时候用
   }, [ ])
   return (
      <div>
         <h3>这里是hook</h3>
         <p>数字num；{ num }</p>
         <button onClick = { aa }>点击num++</button>
      </div>
   )
}
export default Child