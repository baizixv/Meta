import React from 'react'
import { Space } from 'antd'
import ToolCard from './tool-card'
import { toolListConfigs } from './tool-list.config'

const ToolList: React.FC = () => {
  return (
    <Space wrap>
      {toolListConfigs.map(toolCardConfig => (
        <ToolCard {...toolCardConfig} />
      ))}
    </Space>
  )
}

export default ToolList
