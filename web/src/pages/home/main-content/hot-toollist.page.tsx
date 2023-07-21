import React, { useMemo } from 'react'
import ToolList from '@/components/tool-list'
import { getHotToollistConfigs } from '@/configs/router.config/home.config'

const HotToollistPage: React.FC = () => {
  const hotList = useMemo(() => getHotToollistConfigs(), [])
  return <ToolList toolListConfigs={hotList} />
}

export default HotToollistPage
