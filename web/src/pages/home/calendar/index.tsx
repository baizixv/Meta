import React, { useMemo } from 'react'
import { Card } from 'antd'
import { bodyStyle, contentStyle, headStyle } from './style'
import { useTime } from '@/utils/hooks/time'
import {
  Clock,
  DayOrder,
  Festival,
  GodsBad,
  GodsGood,
  LunarDate,
  LunarTerm,
  WeekOrder,
  WorkDay,
  ZodiacSign,
} from './date-component'
import {
  getAllDays,
  getFestival,
  getLeftDays,
  getLunarDate,
  getLunarTerm,
  getTheGods,
  getWeekOfYear,
  getWorkday,
  getZodiacSignOfTime,
} from '@/utils/calculate/date'
import { formatDate } from '@/utils/format/timer'

const CalendarCard: React.FC = () => {
  const { currentTime } = useTime()
  const date = formatDate(currentTime)
  const { lunarDate, term, worktime, lunarFestival, solarFestival } =
    getLunarDate(currentTime)
  const lunarTerm = getLunarTerm(term)
  const festival = getFestival(lunarFestival, solarFestival)
  const workday = getWorkday(currentTime, worktime)
  const weekOrder = getWeekOfYear(currentTime)

  const countDay = getAllDays(currentTime)
  const leftDays = getLeftDays(currentTime)
  const zodiacSign = getZodiacSignOfTime(currentTime)

  const [good, bad] = useMemo(() => {
    const result = getTheGods()
    return result
  }, [date])

  return (
    <Card
      title="今日日历"
      extra={<a href="#">日历查询</a>}
      bordered={false}
      style={contentStyle}
      headStyle={headStyle}
      bodyStyle={bodyStyle}
    >
      <Clock currentTime={currentTime} />
      <WorkDay workday={workday} />
      <Festival festival={festival} />
      <DayOrder countDay={countDay} leftDays={leftDays} />
      <WeekOrder weekOrder={weekOrder} />
      <ZodiacSign zodiacSign={zodiacSign} />
      <LunarDate lunarDate={lunarDate} />
      <LunarTerm lunarTerm={lunarTerm} />
      <GodsGood good={good} />
      <GodsBad bad={bad} />
    </Card>
  )
}

export default CalendarCard
