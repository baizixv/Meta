import React from 'react'
import { Menu } from 'antd'
import initialMenuConfigs from './menu.config'
import useAction from './action'

const Header: React.FC = () => {
  const { currentLabel, onClick } = useAction()
  return (
    <Menu
      mode="horizontal"
      items={initialMenuConfigs}
      selectedKeys={[currentLabel]}
      onClick={onClick}
    />
  )
}

export default Header
