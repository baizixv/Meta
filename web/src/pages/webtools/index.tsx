import React from 'react'
import Breadcrumb from '@/components/breadcrumb'
import { Outlet } from 'react-router-dom'
import { pathNameMap } from '@/configs/router.config/common.config'
import ToolList from '@/components/tool-list'
import { webtoolsListConfigs } from '@/configs/router.config/webtools.config'
// 模块整体架构
const WebTools: React.FC = () => {
  return (
    <div>
      <Breadcrumb breadcrumbNameMap={pathNameMap} />
      <Outlet />
    </div>
  )
}
// 模块主页
const WebToolsHomePage: React.FC = () => {
  return <ToolList toolListConfigs={webtoolsListConfigs} />
}

export { WebToolsHomePage }

export default WebTools
