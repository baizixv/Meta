import React from 'react'
import Header from './header'
import Home from '../home'
import Footer from './footer'

const Layout = () => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(244, 244, 244)',
        height: 'auto',
      }}
    >
      <Header />
      <Home />
      <Footer />
    </div>
  )
}

export default Layout
