import React from 'react'
import { Space } from 'antd'
import { devtoolsConfigs } from './devtools.config'
import DevtoolsCard from './devtools-card'

const Devtools: React.FC = () => {
  return (
    <Space wrap>
      {devtoolsConfigs.map(config => (
        <DevtoolsCard key={config.title} {...config} />
      ))}
    </Space>
  )
}

export default Devtools
