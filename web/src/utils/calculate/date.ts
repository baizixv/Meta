import LunarCalendar, { WorkTime } from 'lunar-calendar'
import lunisolar from 'lunisolar'
import theGods from 'lunisolar/plugins/theGods'
import { formatDate } from '../format/timer'
// 加载插件
lunisolar.extend(theGods)

// 一天的毫秒数
const ONE_DAY_MILSEC = 24 * 60 * 60 * 1000

// 计算年月日
const getDateNumber = (timestamp: number) => {
  const currentDate = new Date(timestamp)
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()
  return { year, month, day }
}

// 计算星期
export const getWeekDay = (timestamp: number): string => {
  const weekArr = ['日', '一', '二', '三', '四', '五', '六']
  const week = new Date(timestamp).getDay()
  return `周${weekArr[week]}`
}

// 计算农历
export const getLunarDate = (timestamp: number): any => {
  const { year, month, day } = getDateNumber(timestamp)
  const lunar = LunarCalendar.solarToLunar(year, month, day)
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

// 计算星座，输入月日
const getZodiacSign = (month: number, day: number): string => {
  // 根据月份和日期判断星座
  switch (true) {
    case (month == 1 && day >= 20) || (month == 2 && day <= 18):
      return '水瓶座' // 01/20 ~ 02/18
    case (month == 2 && day >= 19) || (month == 3 && day <= 20):
      return '双鱼座' // 02/19 ~ 03/20
    case (month == 3 && day >= 21) || (month == 4 && day <= 19):
      return '白羊座' // 03/21 ~ 04/19
    case (month == 4 && day >= 20) || (month == 5 && day <= 20):
      return '金牛座' // 04/20 ~ 05/20
    case (month == 5 && day >= 21) || (month == 6 && day <= 21):
      return '双子座' // 05/21 ~ 06/21
    case (month == 6 && day >= 22) || (month == 7 && day <= 22):
      return '巨蟹座' // 06/22 ~ 07/22
    case (month == 7 && day >= 23) || (month == 8 && day <= 22):
      return '狮子座' // 07/23 ~ 08/22
    case (month == 8 && day >= 23) || (month == 9 && day <= 22):
      return '处女座' // 08/23 ~ 09/22
    case (month == 9 && day >= 23) || (month == 10 && day <= 22):
      return '天秤座' // 09/23 ~ 10/22
    case (month == 10 && day >= 23) || (month == 11 && day <= 21):
      return '天蝎座' // 10/23 ~ 11/21
    case (month == 11 && day >= 22) || (month == 12 && day <= 21):
      return '射手座' // 11/22 ~ 12/21
    case (month == 12 && day >= 22) || (month == 1 && day <= 19):
      return '摩羯座' // 12/22 ~ 01/19
    default:
      return '日期无效'
  }
}

// 计算当前时间的星座
export const getZodiacSignOfTime = (timestamp: number): string => {
  const { month, day } = getDateNumber(timestamp)
  return getZodiacSign(month, day)
}

// 查询神煞宜忌
export const getTheGods = (date: string) => {
  const lsr = lunisolar(date)
  // 取神煞
  // const lsrMon = lsr.theGods.getGods('month') // 取得当日的月神
  // lsr.theGods.getGods('day') // 取得当日的日神
  // lsr.theGods.getDuty12God() // 取得当日建除十二神（建、除、满....）

  // 查宜忌
  const goodAndBad = lsr.theGods.getActs() // 取得当日宜忌 {good: string[], bad: string[]}

  const { good, bad } = goodAndBad

  // const good1 = lsr.theGods.getGoodActs(1) // 取得当日所宜（通书六十事）
  // const good2 = lsr.theGods.getGoodActs(2) // 取得当日所宜（御用六十七事）
  // const bad1 = lsr.theGods.getBadActs(1) // 取得当日所忌（通书六十事）
  // const bad2 = lsr.theGods.getBadActs(2) // 取得当日所忌（御用六十七事）
  // lsr.theGods.getLuckHours() // 取得当日所有时辰吉凶

  // 取得当日指定吉神所在方位  (支持 '喜神' | '福神' | '財神' | '陽貴' | '陰貴' 查询)
  // const [d24, god] = lsr.theGods.getLuckDirection('財神')
  // d24.direction // 南
  // d24.name // 午
  // d24.angle // 180
  return [
    good
      .filter((item: string) => item.length < 3)
      .slice(0, 7)
      .join('.'),
    bad
      .filter((item: string) => item.length < 3)
      .slice(0, 7)
      .join('.'),
  ]
}
