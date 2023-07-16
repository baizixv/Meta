import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import App from '../pages'
import Home from '@/pages/home'
import Devtools from '@/pages/devtools'
import Webtools, { HomePage, QRcode } from '@/pages/webtools'

const routesConfigs = [
  {
    path: 'webtools',
    element: <Webtools />,
    children: [
      { path: '', element: <HomePage /> },
      { path: '*', element: <Navigate to="/webtools" replace /> },
      { path: 'qrcode', element: <QRcode /> },
    ],
  },
  { path: 'devtools', element: <Devtools /> },
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
