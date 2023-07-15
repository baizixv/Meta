import React from 'react'
import { Space } from 'antd'
import QRCodeCard from '../qr-code'

const HomePage: React.FC = () => {
  return (
    <Space wrap>
      <QRCodeCard />
    </Space>
  )
}

export default HomePage
