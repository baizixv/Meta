/**
 * 数字相关的操作
 */
// 将10进制转换成n进制，可以使用toString(n)
// toDecimal(10, 2)
// '1010'
export const toDecimal = (num, n = 10) => num.toString(n)

// 将小数点后的某些数字截断而不取四舍五入
// toFixed(10.255, 2)
// 10.25
export const toFixed = (n, fixed) => `${n}`.match(new RegExp(`^-?\d+(?:.\d{0,${fixed}})?`))[0]

// 将小数点后的某些数字截断，并取四舍五入
// round(10.255, 2)
// 10.26
export const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)

// 在一个数字num不足len位数的时候前面补零操作
// replenishZero(8, 2)
// 08
export const replenishZero = (num, len, zero = 0) => num.toString().padStart(len, zero)

// 