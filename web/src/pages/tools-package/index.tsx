import React from 'react'
import Breadcrumb from '@/components/breadcrumb'
import { Outlet } from 'react-router-dom'
import { pathNameMap } from '@/configs/router.config/common.config'
import FinanceListPage from '../../features/finance'
import RegexpListPage from '../../features/regexp'
import MathToolsListPage from '../../features/math-tools'
import './style.css'

// 模块整体架构
const ToolsPackage: React.FC = () => {
  return (
    <div>
      <Breadcrumb breadcrumbNameMap={pathNameMap} />
      <Outlet />
    </div>
  )
}

// 模块主页
const ToolsPackageHomePage = () => {
  return (
    <div>
      <div className="meta-homecard-tilte">财务计算</div>
      <FinanceListPage />
      <div className="meta-homecard-tilte">正则相关</div>
      <RegexpListPage />
      <div className="meta-homecard-tilte">数学工具</div>
      <MathToolsListPage />
      <div className="meta-homecard-tilte">时间相关</div>
      <MathToolsListPage />
      <div className="meta-homecard-tilte">编码相关</div>
      <MathToolsListPage />
    </div>
  )
}

export { ToolsPackageHomePage }
export default ToolsPackage

