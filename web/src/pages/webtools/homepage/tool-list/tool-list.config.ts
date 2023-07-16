import { ToolCardConfig } from '@/typings/pages/webtools'

export const toolListConfigs: ToolCardConfig[] = [
  {
    name: '二维码生成',
    iconSrc: '@/images/icons/webtools/icon_qrcode.jpg',
    path: '/webtools/qrcode',
    description: '在线生成二维码，支持各种配置',
  },
  {
    name: ' JSON格式化',
    iconSrc: '@/images/icons/webtools/icon_json.jpg',
    path: '/webtools/json',
    description: 'JSON解析和格式化',
    disable: true,
  },
  {
    name: 'bilibili视频下载地址解析',
    iconSrc: '@/images/icons/webtools/icon_qrcode.jpg',
    path: '/webtools/bilibili',
    description: '解析哔哩哔哩视频链接，获取下载地址',
    disable: true,
  },
  {
    name: '抖音视频下载地址解析',
    iconSrc: '@/images/icons/webtools/icon_qrcode.jpg',
    path: '/webtools/douyin',
    description: '解析抖音视频链接，获取去水印的下载地址',
    disable: true,
  },
]
