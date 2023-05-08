/**
 * 字符串相关的操作
 */
/** 大写每个单词的首字母 */
// capitalizeEveryWord('hello world!') -> 'Hello World!'
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase())

/** 首字母大写 */
// capitalize('myName', true) -> 'Myname'
const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1))
