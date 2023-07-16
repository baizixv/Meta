import React from 'react'
import { Space } from 'antd'
import Breadcrumb from '@/components/breadcrumb'
import { Outlet } from 'react-router-dom'
import { breadcrumbNameMap } from '@/configs/webtools.config'

const WebTools: React.FC = () => {
  return (
    <div>
      <Breadcrumb breadcrumbNameMap={breadcrumbNameMap} />
      <Outlet />
    </div>
  )
}

export default WebTools

export { default as HomePage } from './homepage'
export { default as QRcodeCard } from './qr-code'
