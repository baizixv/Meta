import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import BaseRouter from './base-router'

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <BaseRouter />
    </BrowserRouter>
  )
}

export default MyRoutes
