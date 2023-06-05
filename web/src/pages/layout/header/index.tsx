import React, { useState } from 'react'
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'

const items: MenuProps['items'] = [
  {
    label: '主页',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: '常用 API',
    key: 'app',
    icon: <AppstoreOutlined />,
  },
  {
    label: '网站书签集',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    disabled: true,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: '关于本站',
    key: 'about',
    icon: <AppstoreOutlined />,
  },
  {
    label: '给我留言',
    key: 'comment',
    icon: <AppstoreOutlined />,
  },
  {
    label: (
      <a
        href="https://github.com/baizixv"
        target="_blank"
        rel="noopener noreferrer"
      >
        GITHUB
      </a>
    ),
    key: 'alipay',
  },
]

const Header: React.FC = () => {
  const [current, setCurrent] = useState('mail')

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  )
}

export default Header
