import React from 'react'
import { Card, Typography } from 'antd'
import { bodyStyle, contentStyle, headStyle } from './style'
import CopyIcon from '@/components/icons/copy-icon'
import { ToolCardProps } from '@/typings/pages/webtools'

const { Paragraph } = Typography
const ToolCard: React.FC<ToolCardProps> = props => {
  const { name, description, iconSrc, path } = props
  return (
    <Card
      title={name}
      extra={'进入'}
      bordered={false}
      style={contentStyle}
      headStyle={headStyle}
      bodyStyle={bodyStyle}
    >
      <Paragraph ellipsis>{description}</Paragraph>
      <Paragraph
        copyable={{
          text: 'path',
          icon: [
            <CopyIcon copyDesc="复制链接" />,
            <CopyIcon copyDesc="复制成功" copyStatus={true} />,
          ],
          tooltips: false,
        }}
      >
        {path}
      </Paragraph>
    </Card>
  )
}

export default ToolCard
