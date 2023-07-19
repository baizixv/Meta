import React from 'react'
import { Menu } from 'antd'
import initialMenuConfigs from './menu.config'
import useAction from './action'
import { menuStyle } from './style'
import './style.css'

const Header: React.FC = () => {
  const { currentLabel, onClick } = useAction()
  return (
    <div className="header">
      <a className="header_logo-a" href="/">
        Bai.zixv
      </a>
      <Menu
        mode="horizontal"
        items={initialMenuConfigs}
        selectedKeys={[currentLabel]}
        onClick={onClick}
        style={menuStyle}
      />
    </div>
  )
}

export default Header
