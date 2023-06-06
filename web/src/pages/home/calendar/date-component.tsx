import React from 'react'
import { getTimeColor } from '@/utils/calculate/color'
import { formatData } from '@/utils/format/timer'
import { getWeekDay } from '@/utils/calculate/date'

export const Clock = ({ currentTime }: { currentTime: number }) => {
  const time = formatData(currentTime)
  const color = getTimeColor(currentTime)
  return (
    <p>
      时间: <span style={{ borderBottom: `3px solid ${color}` }}>{time}</span>
    </p>
  )
}

export const WeekDay = ({ currentTime }: { currentTime: number }) => {
  const weekday = getWeekDay(currentTime)
  return <p>星期: {weekday}</p>
}
