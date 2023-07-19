import React from 'react'
import Header from './header'
import './index.css'

const Layout = (props: any) => {
  const { children } = props
  return (
    <div className="meta_page">
      <div className="meta_header">
        <Header />
      </div>
      <div className="meta_children">{children}</div>
      {/* <div style={{ position: 'sticky', bottom: 10 }}>
        <Footer />
      </div> */}
    </div>
  )
}

export default Layout
