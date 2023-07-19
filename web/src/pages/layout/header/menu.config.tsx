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
    label: '常用在线工具',
    key: '/webtools',
    icon: <AppstoreOutlined />,
  },
  {
    label: '开发者工具',
    key: '/devtools',
    icon: <AppstoreOutlined />,
  },
  {
    label: '工具包',
    key: '/tools',
    icon: <AppstoreOutlined />,
    // children: [
    //   {
    //     label: '工具列表',
    //     key: '/toollist',
    //   },
    //   {
    //     type: 'group',
    //     label: '财务工具',
    //     children: [
    //       {
    //         label: '汇率计算',
    //         key: '/setting:1',
    //       },
    //       {
    //         label: '利息计算',
    //         key: 'dsetting:2',
    //       },
    //     ],
    //   },
    //   {
    //     type: 'group',
    //     label: '日期工具',
    //     children: [
    //       {
    //         label: '节假日获取',
    //         key: '/setting:3',
    //       },
    //       {
    //         label: '日期推算',
    //         key: '/setting:4',
    //       },
    //     ],
    //   },
    // ],
  },
  {
    label: '免费API',
    key: '/apilist',
    icon: <AppstoreOutlined />,
    disabled: true,
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
    disabled: true,
  },
  {
    label: '给我留言',
    key: '/comment',
    icon: <AppstoreOutlined />,
    disabled: true,
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
