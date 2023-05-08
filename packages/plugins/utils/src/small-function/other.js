/**
 * 其它无法归类的工具函数
 */

// 等待一段时间，但又不想写在setTimeout函数中，造成回调地狱
// sleep(2000).then(() => {console.log('time')})
export const sleep = async t => new Promise(resolve => setTimeout(resolve, t))
