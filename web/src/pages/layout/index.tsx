import React from 'react'
import Header from './header'
import Footer from './footer'

const Layout = (props: any) => {
  const { children } = props
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'rgba(244, 244, 244)',
      }}
    >
      <div style={{ position: 'sticky', marginBottom: 10 }}>
        <Header />
      </div>
      {children}
      {/* <div style={{ position: 'sticky', bottom: 10 }}>
        <Footer />
      </div> */}
    </div>
  )
}

export default Layout
