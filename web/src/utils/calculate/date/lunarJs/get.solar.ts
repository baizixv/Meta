import { Solar, SolarWeek, SolarUtil } from 'lunar-typescript'
import { getDateNumber } from '../date'
// 使用第三方库 'lunar-typescript' 处理阳历相关计算， 农历分阴阳历

// 导出函数， 综合处理阳历相关信息，进行输出
const getSolarDateInfo = (timestamp: number = Date.now()) => {
  const stdDate = new Date(timestamp)
  const date = Solar.fromDate(stdDate)
  const weekDate = SolarWeek.fromDate(stdDate, 0)
  // 天次
  const { daysIndexStr } = getDaysOfYear(timestamp)
  // 周次
  const weekIndexInYear = getIndexInYear(weekDate)
  // 星座
  const xingZuo = getXingZuo(date)

  return { daysIndexStr, weekIndexInYear, xingZuo }
}

// 获取星座
const getXingZuo = (date: Solar): string => {
  const xingZuo = date.getXingZuo()
  return `${xingZuo}座`
}

// 获取周次，以周日作为一周的起点，并且第一周为包含本年的第一日算起
const getIndexInYear = (date: SolarWeek): string => {
  const weekIndexInYear = date.getIndexInYear()
  return `今年的第${weekIndexInYear}周`
}

// 天次
const getDaysOfYear = (timestamp: number) => {
  const [y, m, d] = getDateNumber(timestamp)
  const daysIndex = SolarUtil.getDaysInYear(y, m, d)
  const isLeapYear = SolarUtil.isLeapYear(y)
  const countDays = isLeapYear ? 366 : 365

  return {
    isLeapYear,
    daysIndexStr: `今年的第${daysIndex}天 剩余${countDays - daysIndex}天 ${
      isLeapYear ? '闰年' : ''
    }`,
  }
}
export default getSolarDateInfo
