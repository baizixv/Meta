import React from 'react'
import { Typography } from 'antd'
import { CopyOutlined, CheckOutlined } from '@ant-design/icons'

const { Text } = Typography

const CopyIcon = ({
  copyDesc = '',
  copyIcon = <CopyOutlined />,
  copyCheckIcon = <CheckOutlined />,
  copyStatus = false,
}: {
  copyDesc?: string
  copyIcon?: any
  copyCheckIcon?: any
  copyStatus?: boolean
}) => {
  return (
    <Text code style={{ color: '#666' }}>
      {copyDesc}
      {copyStatus ? copyCheckIcon : copyIcon}
    </Text>
  )
}

export default CopyIcon
