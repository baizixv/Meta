import React from 'react'
import { Input, Space, QRCode } from 'antd'

const QRCodeCard: React.FC = () => {
  const [text, setText] = React.useState('https://ant.design/')

  return (
    <Space direction="horizontal" align="center">
      <Input
        placeholder="-"
        maxLength={60}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <QRCode value={text || '-'} />
    </Space>
  )
}

export default QRCodeCard
