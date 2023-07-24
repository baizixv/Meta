/**
 * 函数相关的操作
 */

// 判断一个函数是否属于异步函数
// isAsyncFunction(async function () {});
// true
export const isAsyncFunction = v => Object.prototype.toString.call(v) === '[object AsyncFunction]'
export const isFunction = fn => {
  return (
    Object.prototype.toString.call(fn) === '[object Function]' &&
    /^function\s/.test(fn.toString())
  )
}
export const FunctionFunc = {
  isFunction,
  isAsyncFunction,
}