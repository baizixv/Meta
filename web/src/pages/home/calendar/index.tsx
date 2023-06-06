import React from 'react'
import { Card } from 'antd'
import { bodyStyle, contentStyle, headStyle } from './style'

const CalendarCard: React.FC = () => {
  return (
    <Card
      title="今日日历"
      bordered={false}
      style={contentStyle}
      headStyle={headStyle}
      bodyStyle={bodyStyle}
    >
      <p>时间：2023/06/06 12:00:27</p>
      <p>农历：癸卯 四月十九</p>
      <p>星座：双子座</p>
      <p>类型：工作日</p>
      <p>天次：今年的第158天</p>
      <p>周次：今年的第23周</p>
      <p>节气：芒种</p>
      <p>宜项：订盟.纳采.出行.祈福.斋醮.安床.会亲友</p>
      <p>禁忌：移徙.入宅.安葬</p>
    </Card>
  )
}

export default CalendarCard
