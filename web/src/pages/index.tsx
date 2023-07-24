import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from './layout'
import { useWebTitle } from '@/utils/hooks/common'

const App = () => {
  useWebTitle()
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App
