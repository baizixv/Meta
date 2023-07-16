import React from 'react'
import { Avatar, Card, Space, Typography } from 'antd'
import { bodyStyle, contentStyle, headStyle } from './style'
import CopyIcon from '@/components/icons/copy-icon'
import { ToolCardProps } from '@/typings/pages/webtools'
import useAction from './action'
const { Title, Text, Paragraph } = Typography

const ToolCard: React.FC<ToolCardProps> = props => {
  const { name, description, iconSrc, path, disable } = props
  const { href, onClick } = useAction(path, disable)
  return (
    <Card
      title={<ToolNameAvatar name={name} iconSrc={iconSrc} disable={disable} />}
      extra={'进入'}
      bordered={false}
      style={contentStyle}
      headStyle={headStyle}
      bodyStyle={bodyStyle}
      onClick={onClick}
    >
      <Paragraph ellipsis>{description}</Paragraph>
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
  iconSrc: string
  disable?: boolean
}) => {
  const { name, iconSrc, disable } = props
  return (
    <Space>
      <Avatar
        shape="square"
        size={{ xs: 12, sm: 16, md: 20, lg: 32, xl: 55, xxl: 60 }}
        src={require(`@/images/icons/webtools/${iconSrc}`)}
      />
      <Paragraph>
        <Title level={5}>{name}</Title>
        <Text type="success" style={{ color: disable ? 'red' : 'cadetblue' }}>
          {disable ? '服务不可用' : '服务正常'}
        </Text>
      </Paragraph>
    </Space>
  )
}

export default ToolCard
