import React from 'react'
import { Avatar, Card, Space, Typography } from 'antd'
import { bodyStyle, contentStyle, headStyle } from './style'
import CopyIcon from '@/components/icons/copy-icon'
import { ToolCardProps } from '@/typings/pages/webtools'
import useAction from './action'
const { Title, Text, Paragraph } = Typography

const ToolCard: React.FC<ToolCardProps> = props => {
  const { name, description, iconSrc, path, enable } = props
  const { href, onClick } = useAction(path, enable)
  return (
    <Card
      title={<ToolNameAvatar name={name} iconSrc={iconSrc} enable={enable} />}
      extra={'进入'}
      bordered={false}
      style={contentStyle}
      headStyle={headStyle}
      bodyStyle={bodyStyle}
      onClick={onClick}
    >
      <Paragraph
        ellipsis={{
          rows: 1,
          tooltip: true,
        }}
      >
        {description}
      </Paragraph>
      <Text
        type="secondary"
        copyable={{
          text: href,
          icon: [<CopyIcon />, <CopyIcon copyStatus={true} />],
          tooltips: ['复制链接', '复制成功'],
        }}
      >
        {path}
      </Text>
    </Card>
  )
}
// 图像和标题
const ToolNameAvatar = (props: {
  name: string
  iconSrc?: string
  enable?: boolean
}) => {
  const { name, iconSrc, enable } = props
  return (
    <Space>
      {!!iconSrc && (
        <Avatar
          shape="square"
          size={{ xs: 12, sm: 16, md: 20, lg: 32, xl: 55, xxl: 60 }}
          src={require(`@/images/icons/webtools/${iconSrc}`)}
        />
      )}
      <Paragraph>
        <Title level={5}>{name}</Title>
        <Text type="success" style={{ color: enable ? 'cadetblue' : 'red' }}>
          {enable ? '服务正常' : '服务不可用'}
        </Text>
      </Paragraph>
    </Space>
  )
}

export default ToolCard
