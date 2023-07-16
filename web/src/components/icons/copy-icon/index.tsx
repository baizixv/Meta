import React from 'react'
import { Typography } from 'antd'
import { CopyOutlined, CheckOutlined } from '@ant-design/icons'

const { Paragraph } = Typography

const CopyIcon = ({
  copyDesc,
  copyIcon = <CopyOutlined />,
  copyCheckIcon = <CheckOutlined />,
  copyStatus = false,
}: {
  copyDesc: string
  copyIcon?: any
  copyCheckIcon?: any
  copyStatus?: boolean
}) => {
  return (
    <Paragraph>
      {copyDesc}
      {copyStatus ? copyCheckIcon : copyIcon}
    </Paragraph>
  )
}

export default CopyIcon
