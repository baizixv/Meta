import React from 'react'
import Breadcrumb from '@/components/breadcrumb'
import { Outlet } from 'react-router-dom'
import { pathNameMap } from '@/configs/router.config/common.config'

const WebTools: React.FC = () => {
  return (
    <div>
      <Breadcrumb breadcrumbNameMap={pathNameMap} />
      <Outlet />
    </div>
  )
}

export default WebTools

export { default as WebToolsHomePage } from './home-page'
export { default as QRcodeCard } from './qr-code'
