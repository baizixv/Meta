import React from 'react'
import Header from './header'
import Footer from './footer'
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

export default Layout
