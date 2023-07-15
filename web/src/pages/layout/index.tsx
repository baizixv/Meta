import React from 'react'
import Header from './header'
import Footer from './footer'

const Layout = (props: any) => {
  const { children } = props
  return (
    <div
      style={{
        height: '100%',
        backgroundColor: 'rgba(244, 244, 244)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          height: '100%',
        }}
      >
        <div style={{ position: 'sticky', marginBottom: 10 }}>
          <Header />
        </div>
        <div style={{ height: '100%' }}>{children}</div>
        {/* <div style={{ position: 'sticky', bottom: 10 }}>
        <Footer />
      </div> */}
      </div>
    </div>
  )
}

export default Layout
