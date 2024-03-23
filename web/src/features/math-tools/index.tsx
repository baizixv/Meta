import React from 'react'
import ToolList from '@/components/tool-list'
import { mathtoolsListConfigs } from '@/configs/router.config/tools-package/mathtools.config'
// 数学工具
const MathToolsListPage: React.FC = () => {
  return <ToolList toolListConfigs={mathtoolsListConfigs} />
}

export default MathToolsListPage
