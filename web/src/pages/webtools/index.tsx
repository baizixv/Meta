import React from 'react'
import { Space } from 'antd'
import Breadcrumb from '@/components/breadcrumb'
import { Outlet } from 'react-router-dom'
import { breadcrumbNameMap } from '@/configs/webtools.config'

const WebTools: React.FC = () => {
  return (
    <Space
      wrap
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Breadcrumb breadcrumbNameMap={breadcrumbNameMap} />
      <Outlet />
    </Space>
  )
}

export default WebTools

export { default as HomePage } from './homepage'
export { default as QRcode } from './qr-code'
