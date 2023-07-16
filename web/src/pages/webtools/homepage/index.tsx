import React from 'react'
import { Space } from 'antd'
import ToolList from './tool-list'
import Breadcrumb from '@/components/breadcrumb'

const HomePage: React.FC = () => {
  return (
    <Space
      wrap
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Breadcrumb />
      <ToolList />
    </Space>
  )
}

export default HomePage
