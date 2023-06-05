import { useRoutes } from 'react-router-dom'
import MyApp from '../pages'
import React from 'react'

const BaseRouter = () =>
  useRoutes([
    {
      path: '/',
      element: <MyApp />,
    },
  ])
export default BaseRouter
