import React from 'react'
import ToolList from '@/components/tool-list'
import { regexpListConfigs } from '@/configs/router.config/tools-package/regexp.config'

const RegexpListPage: React.FC = () => {
  return <ToolList toolListConfigs={regexpListConfigs} />
}

export default RegexpListPage
