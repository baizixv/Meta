import React from 'react'
import ReactDOM from 'react-dom/client'

import reportWebVitals from './reportWebVitals'
import MyRoutes from './routes'
import { isDevModelQuick } from './tools/environment'
import './index.css'

const container = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(container)

if (isDevModelQuick) {
  root.render(<MyRoutes />)
} else {
  root.render(
    <React.StrictMode>
      <MyRoutes />
    </React.StrictMode>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

!isDevModelQuick && reportWebVitals(console.log)
