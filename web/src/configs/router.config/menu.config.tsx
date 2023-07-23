import React from 'react'
import {
  AppstoreOutlined,
  MailOutlined,
  GithubOutlined,
  AlipayCircleOutlined,
  TeamOutlined,
  BugOutlined,
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
  },
  // {
  //   label: '免费API',
  //   key: '/apilist',
  //   icon: <AppstoreOutlined />,
  //   disabled: true,
  // },
  {
    label: '外部网站',
    key: '/outsite',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: '其它归类', // 归类书籍等信息
    key: '/other',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: '关于本站',
    key: '/about',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: '打赏1元',
    key: '/donate',
    icon: <AlipayCircleOutlined />,
    disabled: true,
  },
  {
    label: '给我留言',
    key: '/comment',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: '公告板', // 广告业务，以及自己的公告信息
    key: '/billboard',
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
    icon: <GithubOutlined />,
  },
  {
    label: '反馈问题',
    key: '/bug',
    icon: <BugOutlined />,
    disabled: true,
  },
  {
    label: '高级探索', // 加入登陆功能，然后开放数据库记录储存功能，并且开放社群，给验证码后加入
    key: '/deep',
    icon: <TeamOutlined />,
    disabled: true,
  },
]

export default initialMenuConfigs
