import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import BaseRouter from './base-router'

const Routes = () => {
  return (
    <BrowserRouter>
      <BaseRouter />
    </BrowserRouter>
  )
}

export default Routes
