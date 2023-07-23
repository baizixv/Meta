import React from 'react'
import { Typography } from 'antd'
import './style.css'

const BlockquoteComp: React.FC<{ blockquoteDesc: string }> = ({
  blockquoteDesc,
}) => {
  return (
    <Typography.Paragraph>
      <blockquote className="meta-blockquote">{blockquoteDesc}</blockquote>
    </Typography.Paragraph>
  )
}

export default BlockquoteComp
