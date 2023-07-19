import React from 'react'
import { Space } from 'antd'
import ToolCard from './tool-card'
import { ToolCardConfig } from '@/typings/pages/webtools'

const ToolList: React.FC<{
  toolListConfigs: ToolCardConfig[]
  isHome?: boolean
}> = ({ toolListConfigs, isHome = false }) => {
  return (
    <Space wrap>
      {toolListConfigs.map(toolCardConfig =>
        isHome ? (
          toolCardConfig.needShowHome ? (
            <ToolCard key={toolCardConfig.name} {...toolCardConfig} />
          ) : null
        ) : (
          <ToolCard key={toolCardConfig.name} {...toolCardConfig} />
        )
      )}
    </Space>
  )
}

export default ToolList
