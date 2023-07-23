import React from 'react'
import { Typography } from 'antd'
import { useStyle } from '@/utils/hooks/style'
import { paragraphStyle } from './style'
import './style.css'

const BlockquoteComp: React.FC<{
  blockquoteDesc?: string | React.ReactNode | string[]
  children?: string | React.ReactNode
  style?: any
  className?: string
  divClassName?: string
}> = ({
  blockquoteDesc,
  children,
  style,
  className = '',
  divClassName = '',
}) => {
  const myStyle = useStyle([paragraphStyle, style])
  const showValue = blockquoteDesc || children || ''
  return (
    <Typography.Paragraph style={myStyle}>
      <blockquote className={`meta-blockquote ${className}`}>
        {Array.isArray(showValue)
          ? showValue.map(value => {
              return <div className={divClassName}>{value}</div>
            })
          : showValue}
      </blockquote>
    </Typography.Paragraph>
  )
}

export default BlockquoteComp
