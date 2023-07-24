import React, { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(() => {
    // console.log(
    //   '%c Line:5 🥥 初始化状态',
    //   'font-size:18px;color:#7f2b82;background:#42b983'
    // )
    // 初始化状态的回调函数
    return 0
  })
  // console.log(
  //   '%c Line:5 🍯 count',
  //   'font-size:18px;color:#fca650;background:#b03734',
  //   count
  // )

  // 点击按钮时增加计数
  const increment = () => {
    setCount(prevCount => prevCount + 1)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>增加</button>
    </div>
  )
}

export default Counter
