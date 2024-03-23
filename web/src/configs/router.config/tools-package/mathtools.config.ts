import { ToolCardConfig } from '@/typings/pages/webtools'

export const mathtoolsListConfigs: ToolCardConfig[] = [
  {
    key: 'math-images',
    name: '函数图像',
    description: '根据数学公式，展示数学图像。预设常见函数',
    path: '/tools/math-images',
    disable: true,
    enable: false,
  },
  {
    key: 'id-verification',
    name: '身份证校验',
    description: '校验身份证证件号的合法性',
    path: '/tools/id-verification',
    enable: false,
  },
]
