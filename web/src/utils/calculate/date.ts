import LunarCalendar, { TypeDay, WorkTime } from 'lunar-calendar'

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
