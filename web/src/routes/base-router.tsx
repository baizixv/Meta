import { useRoutes } from 'react-router-dom'
import App from '../pages'
import React from 'react'

const BaseRouter = () =>
  useRoutes([
    {
      path: '/',
      element: <App />,
    },
  ])
export default BaseRouter
