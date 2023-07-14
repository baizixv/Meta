import React from 'react'
import { Card } from 'antd'
import { bodyStyle, contentStyle, headStyle } from './style'

const ToolCard: React.FC<{
  title: string
  extra: any
  children: any
}> = ({ title, extra, children }) => {
  return (
    <Card
      title={title}
      extra={extra}
      style={contentStyle}
      headStyle={headStyle}
      bodyStyle={bodyStyle}
    >
      {children}
    </Card>
  )
}

export default ToolCard
