import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import App from '../pages'
import Home from '@/pages/home'
import Devtools from '@/pages/devtools'
import Webtools, { WebToolsHomePage } from '@/pages/webtools'
import JSONFormat from '@/pages/webtools/json-format'
import QRCodeCard from '@/pages/webtools/qr-code'
import ToolsPackage, { ToolsPackageHomePage } from '@/pages/tools-package'
import MoneyPrice from '@/pages/tools-package/finance/money-price'
import ConvertRate from '@/pages/tools-package/finance/convert-rate'

const routesConfigs = [
  {
    path: 'webtools',
    element: <Webtools />,
    children: [
      { path: '', element: <WebToolsHomePage /> },
      { path: '*', element: <Navigate to="/webtools" replace /> },
      { path: 'qrcode', element: <QRCodeCard /> },
      { path: 'json_format', element: <JSONFormat /> },
    ],
  },
  { path: 'devtools', element: <Devtools /> },
  {
    path: 'tools',
    element: <ToolsPackage />,
    children: [
      { path: '', element: <ToolsPackageHomePage /> },
      { path: '*', element: <Navigate to="/tools" replace /> },
      { path: 'money-price', element: <MoneyPrice /> },
      { path: 'convert-rate', element: <ConvertRate /> },
    ],
  },
]

const BaseRouter = () =>
  useRoutes([
    { path: '/login', element: <React.Fragment /> },
    {
      path: '/',
      element: <App />,
      children: [
        ...routesConfigs,
        { path: '', element: <Home /> },
        { path: '*', element: <Navigate to="/" replace /> },
      ],
    },
  ])
export default BaseRouter
