import React from 'react'
import { Space } from 'antd'
import ToolCard from './tool-card'
import { toolListConfigs } from './tool-list.config'

const ToolList: React.FC<{ isHome?: boolean }> = ({ isHome = false }) => {
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
