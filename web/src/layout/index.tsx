import React from 'react'
import { Outlet } from 'react-router-dom'
import { useWebTitle } from '@/utils/hooks/common'
import Header from './header'
import './style.css'

const Layout = (props: any) => {
  const { children } = props
  return (
    <div className="meta_page">
      <div className="meta_header">
        <Header />
      </div>
      <div>
        <div className="meta_children">{children}</div>
        <div>{/* <Footer /> */}</div>
      </div>
    </div>
  )
}
const App = () => {
  useWebTitle()
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App