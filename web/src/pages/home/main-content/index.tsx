import React from 'react'
import { default as WebToolsHomePage } from '@/pages/webtools/home-page'
import './style.css'

const MainContent = () => {
  return (
    <div>
      <div className="meta-homecard-tilte">热门工具</div>
      <WebToolsHomePage isHome />
      <div className="meta-homecard-tilte">最新博客</div>
      <WebToolsHomePage isHome />
      <div className="meta-homecard-tilte">其它链接</div>
      <WebToolsHomePage isHome />
    </div>
  )
}

export default MainContent
