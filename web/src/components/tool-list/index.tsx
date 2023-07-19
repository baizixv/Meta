import React from 'react'
import { Space } from 'antd'
import ToolCard from './tool-card'
import { ToolCardConfig } from '@/typings/pages/webtools'

const ToolList: React.FC<{
  toolListConfigs: ToolCardConfig[]
}> = ({ toolListConfigs }) => {
  return (
    <Space wrap>
      {toolListConfigs.map(toolCardConfig => (
        <ToolCard key={toolCardConfig.name} {...toolCardConfig} />
      ))}
    </Space>
  )
}

export default ToolList
