declare module 'lunar-calendar' {
  interface LunarDate {
    lunarYear: number
    lunarMonth: number
    lunarDay: number
    isLeap: boolean
  }

  interface LunarCalendar {
    solarToLunar(year: number, month: number, day: number): LunarDate
  }

  const lunar: LunarCalendar

  export default lunar
}
