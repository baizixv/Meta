import React from 'react'
import { useAction } from './action'
import { demoStyle } from './style'
import './style.css'

const Demo: React.FC = () => {
  const {} = useAction()
  const style = { demoStyle }
  return <React.Fragment />
}

export default Demo
