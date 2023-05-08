/**
 * 时间日期相关的操作
 */
export const Time = {
  isToday,
  formatYmd,
  formatSeconds,
  getFirstDate,
  getLastDate,
  getDaysNum,
}

// 判断日期是否为今天
export const isToday = date =>
  date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)

// 当你需要将日期转换为为 YYYY-MM-DD 格式
// formatYmd(new Date())
export const formatYmd = date => date.toISOString().slice(0, 10)

// 将秒数转换为 hh:mm:ss 格式
// formatSeconds(200)
// 00:03:20
export const formatSeconds = s => new Date(s * 1000).toISOString().substr(11, 8)

// 获取某年某月的第一天
// getFirstDate(new Date('2022-04'))
// Fri Apr 01 2022 00:00:00 GMT+0800 (中国标准时间)
export const getFirstDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), 1)

// 获取某年某月的最后一天
// getLastDate(new Date('2023-03-04'))
// Fri Mar 31 2023 00:00:00 GMT+0800 (中国标准时间)
export const getLastDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth() + 1, 0)

// 获取某年某个月份的总天数
// const day = getDaysNum(2024, 2)
// 29
export const getDaysNum = (year, month) => new Date(year, month, 0).getDate()
