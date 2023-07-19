import React from 'react'
import ToolList from './tool-list'

const HomePage: React.FC<{ isHome?: boolean }> = ({ isHome = false }) => {
  return <ToolList isHome={isHome} />
}

export default HomePage
