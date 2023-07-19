import React from 'react'
import './style.css'
import { default as WebToolsHomePage } from '@/pages/webtools/home-page'

const MainContent = () => {
  return (
    <div>
      <div className="meta-homecard-tilte">热门工具</div>
      <WebToolsHomePage isHome />
      <div className="meta-homecard-tilte">最新博客</div>
      <div className="meta-homecard-tilte">其它链接</div>
    </div>
  )
}

export default MainContent
