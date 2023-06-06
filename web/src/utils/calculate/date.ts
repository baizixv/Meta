import LunarCalendar, { WorkTime } from 'lunar-calendar'

// 一天的毫秒数
const ONE_DAY_MILSEC = 24 * 60 * 60 * 1000

// 计算星期
export const getWeekDay = (timestamp: number): string => {
  const weekArr = ['日', '一', '二', '三', '四', '五', '六']
  const week = new Date(timestamp).getDay()
  return `周${weekArr[week]}`
}

// 计算农历
export const getLunarDate = (timestamp: number): any => {
  const currentDate = new Date(timestamp)
  const year = currentDate.getFullYear()
  const lunar = LunarCalendar.solarToLunar(
    year,
    currentDate.getMonth() + 1,
    currentDate.getDate()
  )
  const {
    GanZhiYear,
    zodiac,
    GanZhiMonth,
    GanZhiDay,
    lunarMonthName,
    lunarDayName,
    isLeap,
    lunarYear,
    term,
    worktime,
    lunarFestival,
    solarFestival,
  } = lunar as any
  const lunarDate = `${
    isLeap ? '闰' : ''
  }${lunarMonthName}${lunarDayName} ${GanZhiYear}${zodiac}年${
    lunarYear !== year ? '(' + lunarYear + ')' : ''
  } ${GanZhiMonth}月 ${GanZhiDay}日`

  return { lunarDate, term, worktime, solarFestival, lunarFestival }
}

// 计算节气
export const getLunarTerm = (term: string | undefined): string => {
  return `${term ? term : '非节气日'}`
}

// 计算节日
export const getFestival = (
  lunarFestival: string | undefined,
  solarFestival: string | undefined
): string => {
  let result = ''

  if (lunarFestival) {
    result += `农历-${lunarFestival} `
  }

  if (solarFestival) {
    result += `公历-${solarFestival}`
  }

  if (!lunarFestival && !solarFestival) {
    result += '无节日'
  }

  return result
}

// 计算工作日
export const getWorkday = (timestamp: number, worktime: WorkTime): string => {
  const week = new Date(timestamp).getDay() // 0-6 日-六
  const TypeDay = {
    Normal: 0,
    Work: 1,
    Holiday: 2,
  }
  switch (worktime) {
    case TypeDay.Normal:
      return week > 0 && week < 6 ? `工作日` : `休息日`
    case TypeDay.Work:
      return `休息日`
    case TypeDay.Holiday:
      return week > 0 && week < 6 ? `工作日` : `工作日-调休`
    default:
      return `工作日`
  }
}

// 计算周次
export const getWeekOfYear = (timestamp: number) => {
  const dateObj = new Date(timestamp)
  const startOfYear = new Date(timestamp)

  startOfYear.setMonth(0) //1月
  startOfYear.setDate(1) //1日

  let dayOfFirstDate = startOfYear.getDay() //1号是星期几
  let dateOfFirstThursday //所在年份的第一个星期四的日期
  //计算所在年份的第一个星期四
  if (dayOfFirstDate < 5) {
    //1月1日在星期五之前，则再过(4 - dayOfFirstDate)天是星期四
    dateOfFirstThursday =
      startOfYear.getTime() + ONE_DAY_MILSEC * (4 - dayOfFirstDate)
  } else {
    //否则顺延一周，再过( 4 - dayOfFirstDate + 7) 天 才是当年的第一个星期四
    dateOfFirstThursday =
      startOfYear.getTime() + ONE_DAY_MILSEC * (4 - dayOfFirstDate + 7)
  }
  let curThursday = dateObj.getTime() + ONE_DAY_MILSEC * (4 - dateObj.getDay()) //给定日期所在周的星期四

  let ans = ''
  if (curThursday >= dateOfFirstThursday) {
    const year = startOfYear.getFullYear()
    ans = `${
      '第' +
      ((curThursday - dateOfFirstThursday) / ONE_DAY_MILSEC / 7 + 1) +
      '周'
    }${year === dateObj.getFullYear() ? '' : '-' + year + '年'}`
  } else {
    //指定日期是在上一年的最后一个星期
    let lastDayOfLastYear = startOfYear.getTime() - ONE_DAY_MILSEC
    const year = new Date(lastDayOfLastYear).getFullYear()
    ans = getWeekOfYear(lastDayOfLastYear)
  }
  return ans
}

// 计算一年多少天
export const getAllDays = (timestamp: number) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const monthArr = [4, 6, 9, 11]
  let isLeapYear = false
  let countDay = 0

  if (year % 100 === 0) {
    // 年份整百
    isLeapYear = year % 400 === 0
  } else {
    isLeapYear = year % 4 === 0
  }

  // 计算每个月的天数
  for (let i = 1; i < 13; i++) {
    if (i === 2) {
      countDay += isLeapYear ? 29 : 28
    } else if (monthArr.includes(i)) {
      countDay += 30
    } else {
      countDay += 31
    }
  }

  return countDay
}

// 计算剩余天数，不包含今天
export const getLeftDays = (timestamp: number) => {
  const today = new Date(timestamp)
  // 本年最后的标准时间
  const endYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59)

  // 本年剩余时间，用今天的毫秒数减去本年最后一天的毫秒数
  const leftDays = Math.floor((endYear.getTime() - timestamp) / ONE_DAY_MILSEC)

  return leftDays
}
