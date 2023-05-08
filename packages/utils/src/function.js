/**
 * 函数相关的操作
 */
export const Function = {
  isAsyncFunction,
}
// 判断一个函数是否属于异步函数
// isAsyncFunction(async function () {});
// true
export const isAsyncFunction = v => Object.prototype.toString.call(v) === '[object AsyncFunction]'
