import { useRoutes } from 'react-router-dom'
import MyApp from '../pages'
import React from 'react'

const Routes = () =>
  useRoutes([
    {
      path: '/',
      element: <MyApp />,
    },
  ])
export default Routes
