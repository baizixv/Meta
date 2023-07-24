declare module 'lunar-calendar' {
  export enum TypeDay {
    Normal = 0, // 无特殊安排
    Work = 1, // 工作日
    Holiday = 2, // 放假
  }

  export type WorkTime = TypeDay.Normal | TypeDay.Work | TypeDay.Holiday

  interface LunarDate {
    lunarYear: number
    lunarMonth: number
    lunarDay: number
    isLeap: boolean
    worktime: WorkTime
  }

  interface LunarCalendar {
    solarToLunar(year: number, month: number, day: number): LunarDate
  }

  const lunar: LunarCalendar

  export default lunar
}
