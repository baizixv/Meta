import React from 'react'
import { Tag, Typography } from 'antd'
const { Paragraph, Text } = Typography

const DescList: React.FC<{
  descList: string[][]
}> = ({ descList }) => {
  return (
    <Paragraph style={{ marginTop: 10 }}>
      {descList.map(items => {
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
export default DescList
