import React from 'react'
import Base64Card from './base64-card'
import { Space } from 'antd'
import MD5Card from './md5-card'

const Devtools: React.FC = () => {
  return (
    <Space>
      <Base64Card />
      <MD5Card />
    </Space>
  )
}

export default Devtools
