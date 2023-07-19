import { ToolCardConfig } from '@/typings/pages/webtools'

export const financeListConfigs: ToolCardConfig[] = [
  {
    name: '借贷利率计算',
    path: '/tools/money-price',
    description: '提供借贷利率计算，生成月供账单。或者根据月供推算实际利率.',
    needShowHome: true,
  },
]
