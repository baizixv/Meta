import React from 'react'
import { getTimeColor } from '@/utils/calculate/color'
import { formatData } from '@/utils/format/timer'
import { getLunarDate, getWeekDay } from '@/utils/calculate/date'

// 时钟
export const Clock = ({ currentTime }: { currentTime: number }) => {
  const time = formatData(currentTime)
  const color = getTimeColor(currentTime)
  return (
    <p>
      时间: <span style={{ borderBottom: `3px solid ${color}` }}>{time}</span>
    </p>
  )
}

// 星期
export const WeekDay = ({ currentTime }: { currentTime: number }) => {
  const weekday = getWeekDay(currentTime)
  return <p>星期: {weekday}</p>
}

// 农历
const LunarDate = ({ currentTime }: { currentTime: number }) => {
  const lunarDate = getLunarDate(currentTime)
  return (
    <div>
      <p>农历: {lunarDate}</p>
    </div>
  )
}

export default LunarDate
