import React from 'react'
import { Space } from 'antd'
import Breadcrumb from '@/components/breadcrumb'
import { Outlet } from 'react-router-dom'
import { pathNameMap } from '@/configs/webtools.config'

const WebTools: React.FC = () => {
  return (
    <div>
      <Breadcrumb breadcrumbNameMap={pathNameMap} />
      <Outlet />
    </div>
  )
}

export default WebTools

export { default as HomePage } from './homepage'
export { default as QRcodeCard } from './qr-code'
