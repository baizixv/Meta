import React from 'react'
import './style.css'
import { default as WebToolsHomePage } from '@/pages/webtools/home-page'
import FinanceListPage from '../finance'

const HomePage = () => {
  return (
    <div>
      <div className="meta-homecard-tilte">财务计算</div>
      <FinanceListPage />
      <div className="meta-homecard-tilte">时间相关</div>
      <WebToolsHomePage />
      <div className="meta-homecard-tilte">编码相关</div>
      <WebToolsHomePage />
      <div className="meta-homecard-tilte">编码相关</div>
      <WebToolsHomePage />
      <div className="meta-homecard-tilte">编码相关</div>
      <WebToolsHomePage />
    </div>
  )
}

export default HomePage
