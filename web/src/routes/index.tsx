import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import BaseRouter from './base-router'
import './App.css'

const Routes = () => {
  return (
    <BrowserRouter>
      <BaseRouter />
    </BrowserRouter>
  )
}

export default Routes
