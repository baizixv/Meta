import { Solar, Lunar, HolidayUtil } from 'lunar-typescript'
import { TypeDay, getDateNumber, getWorkday } from '../date'
import type { DayType } from '@/typings/date'
import { convertDate } from './get.lunar'

// 使用第三方库 'lunar-typescript' 处理假期相关计算， 包括阴阳历和法定节假日安排

// 导出函数，综合信息输出
const getHolidayInfo = (timestamp: number = Date.now()) => {
  const stdDate = new Date(timestamp)

  const [legalHoliday, dateTypeStr] = getLegalHoliday(timestamp)

  const lunarDate = Lunar.fromDate(stdDate)
  const lunarHoliday = getLunarHoliday(lunarDate)

  const solarDate = Solar.fromDate(stdDate)
  const solarHoliday = getSolarHoliday(solarDate)

  const holiday = `${legalHoliday} ${lunarHoliday} ${solarHoliday} ${
    legalHoliday || lunarHoliday || solarHoliday ? '' : '无'
  }`

  return { dateTypeStr, holiday }
}

// 获取法定节假日，以及调休日期
const getLegalHoliday = (timestamp: number) => {
  const [y, m, d] = getDateNumber(timestamp)
  const holidayDate = HolidayUtil.getHoliday(y, m, d)
  let dateType: DayType = TypeDay.Normal

  if (holidayDate) {
    // 有节假日，有放假调休安排
    const targetDay = holidayDate.getTarget()
    const holidays = HolidayUtil.getHolidaysByTarget(targetDay).map(item => ({
      isWork: item.isWork(),
      day: convertDate(item.getDay()).slice(0, 5),
    }))

    const [workDayRanges, holidayRanges] = holidays.reduce(
      (acc: string[][], cur) => {
        if (cur.isWork) {
          acc[0].push(cur.day)
        } else {
          acc[1].push(cur.day)
        }
        return acc
      },
      [[], []]
    )
    dateType = holidayDate.isWork() ? TypeDay.Work : TypeDay.Holiday
    const dateTypeStr = `${getWorkday(timestamp, dateType)}`
    const legalHoliday = `${holidayDate.getName()}假期[${
      holidayRanges.length > 1
        ? holidayRanges.shift() + '~' + holidayRanges.pop()
        : holidayRanges.pop()
    }] ${
      workDayRanges.length > 0 ? '调休日[' + workDayRanges.join(',') + ']' : ''
    }`
    return [legalHoliday, dateTypeStr]
  } else {
    // 无节假日，正常周一到周五工作，周六周日休息
    const dateTypeStr = getWorkday(timestamp, dateType)
    return ['', dateTypeStr]
  }
}

// 获取阴历节假日
const getLunarHoliday = (date: Lunar) => {
  const lunarFestival = date.getFestivals()

  const lunarFestivalOther = date.getOtherFestivals()

  return `${[...lunarFestival, ...lunarFestivalOther].join('.')}`
}

// 获取阳历节假日
const getSolarHoliday = (date: Solar) => {
  const solarFestival = date.getFestivals()
  const solarFestivalOther = date.getOtherFestivals()

  return `${[...solarFestival, ...solarFestivalOther].join('.')}`
}

export default getHolidayInfo
