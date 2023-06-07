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
  LunarJieQi,
  LunarOtherInfo,
  WeekOrder,
  DayType,
  ZodiacSign,
} from './date-component'
import { formatDate } from '@/utils/format/timer'
import {
  getHolidayInfo,
  getLunarDateInfo,
  getSolarDateInfo,
} from '@/utils/calculate/date/lunarJs'

const CalendarCard: React.FC = () => {
  const { currentTimestamp } = useTime()
  const date = formatDate(currentTimestamp)
  const {
    lunarDate,
    jieQi,
    good,
    bad,
    lunarOtherInfo,
    daysIndexStr,
    weekIndexInYear,
    xingZuo,
    dateTypeStr,
    holiday,
  } = useMemo(() => {
    const holidayInfo = getHolidayInfo(currentTimestamp)
    const lunarDateInfo = getLunarDateInfo(currentTimestamp)
    const solarDateInfo = getSolarDateInfo(currentTimestamp)
    return { ...lunarDateInfo, ...solarDateInfo, ...holidayInfo }
  }, [date])

  return (
    <Card
      title="今日日历"
      extra={<a href="#">详细信息</a>}
      bordered={false}
      style={contentStyle}
      headStyle={headStyle}
      bodyStyle={bodyStyle}
    >
      <Clock currentTime={currentTimestamp} />
      <DayType dateTypeStr={dateTypeStr} />
      <Festival festival={holiday} />
      <DayOrder daysIndexStr={daysIndexStr} />
      <WeekOrder weekOrder={weekIndexInYear} />
      <ZodiacSign zodiacSign={xingZuo} />
      <LunarDate lunarDate={lunarDate} />
      <LunarJieQi jieQi={jieQi} />
      <LunarOtherInfo lunarOtherInfo={lunarOtherInfo} />
      <GodsGood good={good} />
      <GodsBad bad={bad} />
    </Card>
  )
}

export default CalendarCard
