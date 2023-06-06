import LunarCalendar from 'lunar-calendar'

export const getWeekDay = (timestamp: number): string => {
  const weekArr = ['日', '一', '二', '三', '四', '五', '六']
  const week = new Date(timestamp).getDay()
  return `周${weekArr[week]}`
}

export const getLunarDate = (timestamp: number): string => {
  const currentDate = new Date(timestamp)
  const lunar = LunarCalendar.solarToLunar(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  )
  const lunarDateString = `${lunar.lunarYear}年${lunar.lunarMonth}${
    lunar.isLeap ? '闰' : ''
  }${lunar.lunarDay}`

  return lunarDateString
}
