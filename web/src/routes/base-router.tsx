import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import App from '../pages'
import Home from '@/pages/home'
import Devtools from '@/pages/devtools'
import * as Webtools from '@/pages/webtools'

const routesConfigs = [
  { path: '', element: <Home /> },
  { path: 'webtools', element: <Webtools.HomePage /> },
  { path: 'webtools/qrcode', element: <Webtools.QRcode /> },
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
        { path: '', element: <Navigate to="/" replace /> },
        { path: '*', element: <Navigate to="/" replace /> },
        { path: 'home', element: <Navigate to="/" replace /> },
      ],
    },
  ])
export default BaseRouter
