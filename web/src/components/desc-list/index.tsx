import React from 'react'
import { Tag, Typography } from 'antd'
import { useStyle } from '@/utils/hooks/style'
const { Paragraph, Text } = Typography

const DescList: React.FC<{
  descList: string[][]
  color?: string | string[]
  style?: any
  textStyle?: any
  tagStyle?: any
}> = ({ descList, color = 'volcano', style, textStyle, tagStyle }) => {
  const paragStyle = useStyle([{ marginTop: 10 }, style])
  const myTextStyle = useStyle([textStyle])
  const myTagStyle = useStyle([tagStyle])
  return (
    <Paragraph style={paragStyle}>
      {descList.map((items, index) => {
        const [title, value] = items
        return (
          <Text key={index} style={myTextStyle}>
            {title}
            {value && (
              <Tag
                color={Array.isArray(color) ? color[index] : color}
                style={myTagStyle}
              >
                {value}
              </Tag>
            )}
          </Text>
        )
      })}
    </Paragraph>
  )
}
export default DescList
