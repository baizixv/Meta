import React from 'react'
import ToolList from '@/components/tool-list'
import { webtoolsListConfigs } from '@/configs/webtools.config'

const HomePage: React.FC = () => {
  return <ToolList toolListConfigs={webtoolsListConfigs} />
}

export default HomePage
