import React from 'react'
import { Tag, Typography } from 'antd'
import { fixed2 } from '@/utils/format/number'

const { Paragraph, Text } = Typography

const DebtDesc: React.FC<{
  rate: number
  interestCount: number
  debtMoney: number
}> = ({ rate, interestCount, debtMoney }) => {
  const captionShows = [
    ['还款总额：', `${fixed2(+debtMoney + +interestCount)}元`],
    ['年化利率：', `${fixed2(rate * 100)}%`],
    ['利息总额：', `${fixed2(interestCount)}元`],
  ]
  return (
    <Paragraph style={{ marginTop: 10 }}>
      {captionShows.map(items => {
        const [title, value] = items
        return (
          <Text key={title}>
            {title}
            <Tag color="volcano">{value}</Tag>
          </Text>
        )
      })}
    </Paragraph>
  )
}
export default DebtDesc
