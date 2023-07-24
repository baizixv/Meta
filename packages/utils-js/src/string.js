/**
 * 字符串相关的操作
 */

/** 大写每个单词的首字母 */
// capitalizeEveryWord('hello world!') -> 'Hello World!'
export const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase())

/** 首字母大写 */
// capitalize('myName', true) -> 'Myname'
export const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1))

// 简化长字符显示，中间短省略号，前后保留固定位数字符
export const simplifyString = (str, start = 4, end = 3) => {
  const strArr = [...str]
  const simplifyStr = strArr
    .slice(0, start)
    .concat(['···'])
    .concat(strArr.slice(-end))
  return simplifyStr.join('')
}
export const StringFunc = {
  simplifyString,
  capitalizeEveryWord,
  capitalize,
}