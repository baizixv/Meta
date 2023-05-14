/**
 * 随机值相关的操作
 */

// 生成一个随机ip地址
// randomIp() // '155.248.136.10'
export const randomIp = () =>
  Array(4)
    .fill(0)
    .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
    .join('.')

// 生成一个uuid
// uuid() // '0cf6c46d-47af-461a-ac8f-b9db15187316'
export const uuid = a =>
  a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid)

export const RandomFunc = {
  randomIp,
  uuid,
}