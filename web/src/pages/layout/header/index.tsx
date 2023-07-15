import React from 'react'
import { Menu } from 'antd'
import initialMenuConfigs from './menu.config'
import useAction from './action'
import { menuStyle } from './style'

const Header: React.FC = () => {
  const { currentLabel, onClick } = useAction()
  return (
    <Menu
      mode="horizontal"
      items={initialMenuConfigs}
      selectedKeys={[currentLabel]}
      onClick={onClick}
      style={menuStyle}
    />
  )
}

export default Header
