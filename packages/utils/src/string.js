/**
 * 字符串相关的操作
 */
export const String = {
  capitalizeEveryWord,
  capitalize,
}
/** 大写每个单词的首字母 */
// capitalizeEveryWord('hello world!') -> 'Hello World!'
export const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase())

/** 首字母大写 */
// capitalize('myName', true) -> 'Myname'
export const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1))
