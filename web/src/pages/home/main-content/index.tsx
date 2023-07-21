import React from 'react'
import HotToollistPage from './hot-toollist.page'
import { WebToolsHomePage } from '@/pages/webtools'
import './style.css'

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
