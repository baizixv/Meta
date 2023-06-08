import React from 'react'
import Header from './header'
import Home from '../home'
import Footer from './footer'

const Layout: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(244, 244, 244)',
      }}
    >
      <div style={{ position: 'sticky', marginBottom: 10 }}>
        <Header />
      </div>
      <Home />
      <Footer />
    </div>
  )
}

export default Layout
