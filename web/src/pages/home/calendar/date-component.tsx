import React from 'react'
import { getTimeColor } from '@/utils/calculate/color'
import { formatTimeData } from '@/utils/format/timer'

// 时钟组件
export const Clock = ({ currentTime }: { currentTime: number }) => {
  const time = formatTimeData(currentTime)
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
export const LunarJieQi = ({ jieQi }: { jieQi: string }) => {
  return <p>节气: {jieQi}</p>
}

// 节日组件
export const Festival = ({ festival }: { festival: string }) => {
  return <p>节日: {festival}</p>
}

// 工作日
export const DayType = ({ dateTypeStr }: { dateTypeStr: string }) => {
  return <p>类型: {dateTypeStr}</p>
}

// 天次
export const DayOrder = ({ daysIndexStr }: { daysIndexStr: string }) => {
  return <p>天次: {`${daysIndexStr}`}</p>
}

// 周次
export const WeekOrder = ({ weekOrder }: { weekOrder: string }) => {
  return <p>周次: {weekOrder}</p>
}

// 星座
export const ZodiacSign = ({ zodiacSign }: { zodiacSign: string }) => {
  return <p>星座: {zodiacSign}</p>
}

// 神煞宜项
export const GodsGood = ({ good }: { good: string }) => {
  return <p>宜项: {good}</p>
}

// 神煞禁忌
export const GodsBad = ({ bad }: { bad: string }) => {
  return <p>禁忌: {bad}</p>
}

// 阴历其它信息
export const LunarOtherInfo = ({
  lunarOtherInfo,
}: {
  lunarOtherInfo: string
}) => {
  return <p>卦象: {lunarOtherInfo}</p>
}
