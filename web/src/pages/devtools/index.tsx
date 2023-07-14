import React from 'react'
import Base64Card from './base64-card'
import { Space } from 'antd'
import MD5Card from './md5-card'
import ColorConvertCard from './color-convert-card'
import ColorGetCard from './color-get-card'

const Devtools: React.FC = () => {
  return (
    <Space wrap>
      <Base64Card />
      <MD5Card />
      <ColorConvertCard />
      <ColorGetCard />
    </Space>
  )
}

export default Devtools
