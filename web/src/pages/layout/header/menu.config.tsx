import React from 'react'
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons'

const initialMenuConfigs = [
  {
    label: '主页',
    key: '/home',
    icon: <MailOutlined />,
  },
  {
    label: '免费API',
    key: '/apilist',
    icon: <AppstoreOutlined />,
  },
  {
    label: '在线工具',
    key: '/webtools',
    icon: <AppstoreOutlined />,
  },
  {
    label: '开发者工具',
    key: '/devtools',
    icon: <AppstoreOutlined />,
  },
  {
    label: '网站合集',
    key: '/submenu',
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
    key: '/about',
    icon: <AppstoreOutlined />,
  },
  {
    label: '给我留言',
    key: '/comment',
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
    key: '/github',
  },
]

export default initialMenuConfigs
