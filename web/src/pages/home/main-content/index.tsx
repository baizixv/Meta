import React from 'react'
import { default as WebToolsHomePage } from '@/pages/webtools/home-page'
import './style.css'
import HotToollistPage from './hot-toollist.page'

const MainContent = () => {
  return (
    <div>
      <div className="meta-homecard-tilte">热门工具</div>
      <HotToollistPage />
      <div className="meta-homecard-tilte">最新博客</div>
      <WebToolsHomePage />
      <div className="meta-homecard-tilte">其它链接</div>
      <WebToolsHomePage />
    </div>
  )
}

export default MainContent
