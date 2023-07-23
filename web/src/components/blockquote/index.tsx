import React from 'react'
import { Typography } from 'antd'
import { useStyle } from '@/utils/hooks/style'
import { paragraphStyle } from './style'
import './style.css'

const BlockquoteComp: React.FC<{
  blockquoteDesc?: string | React.ReactNode
  children?: string | React.ReactNode
  style?: any
  className?: string
}> = ({ blockquoteDesc, children, style, className = '' }) => {
  const myStyle = useStyle([paragraphStyle, style])
  return (
    <Typography.Paragraph style={myStyle}>
      <blockquote className={`meta-blockquote ${className}`}>
        {blockquoteDesc || children || ''}
      </blockquote>
    </Typography.Paragraph>
  )
}

export default BlockquoteComp
