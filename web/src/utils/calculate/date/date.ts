import type { DayType } from '@/typings/date'

export const TypeDay = {
  Normal: 0,
  Work: 1,
  Holiday: 2,
}
// 计算年月日
export const getDateNumber = (timestamp: number = Date.now()) => {
  const currentDate = new Date(timestamp)
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()
  return [year, month, day]
}

// 计算星期
export const getWeekDay = (timestamp: number): string => {
  const weekArr = ['日', '一', '二', '三', '四', '五', '六']
  const week = new Date(timestamp).getDay()
  return `周${weekArr[week]}`
}

// 计算工作日
export const getWorkday = (timestamp: number, dayType: DayType): string => {
  const week = new Date(timestamp).getDay() // 0-6 日-六

  switch (dayType) {
    case TypeDay.Normal:
      return week > 0 && week < 6 ? `工作日` : `休息日`
    case TypeDay.Holiday:
      return `法定节假日`
    case TypeDay.Work:
      return week > 0 && week < 6 ? `工作日` : `调休-工作日`
    default:
      return `工作日`
  }
}
