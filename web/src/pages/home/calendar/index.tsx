import React from 'react'
import { Card } from 'antd'
import { bodyStyle, contentStyle, headStyle } from './style'
import { useTime } from '@/utils/hooks/time'
import {
  Clock,
  DayOrder,
  Festival,
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
  getWeekOfYear,
  getWorkday,
  getZodiacSignOfTime,
} from '@/utils/calculate/date'

const CalendarCard: React.FC = () => {
  const { currentTime } = useTime()
  const { lunarDate, term, worktime, lunarFestival, solarFestival } =
    getLunarDate(currentTime)
  const lunarTerm = getLunarTerm(term)
  const festival = getFestival(lunarFestival, solarFestival)
  const workday = getWorkday(currentTime, worktime)
  const weekOrder = getWeekOfYear(currentTime)

  const countDay = getAllDays(currentTime)
  const leftDays = getLeftDays(currentTime)
  const zodiacSign = getZodiacSignOfTime(currentTime)

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
      <p>宜项: 订盟.纳采.出行.祈福.斋醮.安床.会亲友</p>
      <p>禁忌: 移徙.入宅.安葬</p>
    </Card>
  )
}

export default CalendarCard
