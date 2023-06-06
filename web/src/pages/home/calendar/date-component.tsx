import React from 'react'
import { getTimeColor } from '@/utils/calculate/color'
import { formatData } from '@/utils/format/timer'
import { getWeekDay } from '@/utils/calculate/date'

// 时钟组件
export const Clock = ({ currentTime }: { currentTime: number }) => {
  const time = formatData(currentTime)
  const color = getTimeColor(currentTime)

  return (
    <p>
      时间: <span style={{ borderBottom: `3px solid ${color}` }}>{time}</span>
    </p>
  )
}

// 农历日期组件
export const LunarDate = ({ lunarDate }: { lunarDate: string }) => {
  return <p>农历: {lunarDate}</p>
}

// 节气组件
export const LunarTerm = ({ lunarTerm }: { lunarTerm: string }) => {
  return <p>节气: {lunarTerm}</p>
}

// 节日组件
export const Festival = ({ festival }: { festival: string }) => {
  return <p>节日: {festival}</p>
}

// 工作日
export const WorkDay = ({ workday }: { workday: string }) => {
  return <p>类型: {workday}</p>
}

// 天次
export const DayOrder = ({ countDay, leftDays }: { countDay: number, leftDays: number }) => {
  const orderDays = countDay - leftDays
  return <p>天次: {`第${orderDays}天 今年共${countDay}天 还剩余${leftDays}天` }</p>
}

// 周次
export const WeekOrder = ({ weekOrder }: { weekOrder: string }) => {
  return <p>周次: {weekOrder}</p>
}

// 星座
export const ZodiacSign = ({zodiacSign}: {zodiacSign: string}) => {
  return <p>星座: {zodiacSign}</p>
}

// 神煞宜项
export const GodsGood = ({ good }: { good: string }) => {
  return <p>宜项: {good }</p>
}

// 神煞禁忌
export const GodsBad = ({ bad }: { bad: string }) => {
  return <p>禁忌: {bad }</p>
}

