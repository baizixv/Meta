import React from 'react'
import ToolList from '@/components/tool-list'
import { webtoolsListConfigs } from '@/configs/webtools.config'

const HomePage: React.FC<{ isHome?: boolean }> = ({ isHome = false }) => {
  return <ToolList toolListConfigs={webtoolsListConfigs} isHome={isHome} />
}

export default HomePage
