import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import App from '../pages'
import Home from '@/pages/home'
import Devtools from '@/pages/devtools'
import Webtools, { WebToolsHomePage, QRcodeCard } from '@/pages/webtools'
import JSONFormat from '@/pages/webtools/json-format'
import ToolsPackage from '@/pages/tools-package'

const routesConfigs = [
  {
    path: 'webtools',
    element: <Webtools />,
    children: [
      { path: '', element: <WebToolsHomePage /> },
      { path: '*', element: <Navigate to="/webtools" replace /> },
      { path: 'qrcode', element: <QRcodeCard /> },
      { path: 'json_format', element: <JSONFormat /> },
    ],
  },
  { path: 'devtools', element: <Devtools /> },
  {
    path: 'tools',
    element: <ToolsPackage />,
    children: [
      { path: '', element: <WebToolsHomePage /> },
      { path: '*', element: <Navigate to="/tools" replace /> },
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
