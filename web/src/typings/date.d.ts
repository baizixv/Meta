export type WorkTime = {
  Normal: 0
  Work: 1
  Holiday: 2
}
export enum DayType {
  Normal = 0, // 无特殊安排, 正常周一到周五工作，周六周日休息
  Work = 1, // 放假导致的调休工作日
  Holiday = 2, // 放假
}
