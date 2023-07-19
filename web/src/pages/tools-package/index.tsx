import React from 'react'
import Breadcrumb from '@/components/breadcrumb'
import { Outlet } from 'react-router-dom'
import { pathNameMap } from '@/configs/webtools.config'

const ToolsPackage: React.FC = () => {
  return (
    <div>
      <Breadcrumb breadcrumbNameMap={pathNameMap} />
      <Outlet />
    </div>
  )
}

export default ToolsPackage

export { default as ToosPackageHomePage } from './home-page'