/**
 * 正则相关的操作
 */
export const Regex = {
  formatPhone,
  setTrimOut,
}

// 将手机号码格式化成xxx-xxxx-xxxx的形式
// formatPhone('13123456789')
// '131-2345-6789'
// formatPhone('13 1234 56 789', ' ')
// '131 2345 6789'
export const formatPhone = (str, sign = '-') =>
  str
    .replace(/(\W|\s)/g, '')
    .split(/^(\d{3})(\d{4})(\d{4})$/)
    .filter(item => item)
    .join(sign)

// 将一段文本中的多个空格合并成一个空格
// const str = setTrimOut('hello,   jack')
// hello, jack
export const setTrimOut = str => str.replace(/\s\s+/g, ' ')
