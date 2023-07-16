import React from 'react'
import { Breadcrumb as BreadcrumbComp } from 'antd'
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom'

const Breadcrumb: React.FC = () => {
  const breadcrumbItems = [
    {
      key: 'home',
      title: <Link to="/">Home</Link>,
    },
    {
      key: 'home',
      title: <Link to="/">Home</Link>,
    },
  ]
  return <BreadcrumbComp separator=">" items={breadcrumbItems} />
}

export default Breadcrumb
