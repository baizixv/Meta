import { PaymentType } from '@/typings/configs/common'
import { ToolCardConfig } from '@/typings/pages/webtools'

export const financeListConfigs: ToolCardConfig[] = [
  {
    name: '借贷利率计算',
    description: '提供借贷利率计算，生成月供账单。或者根据月供推算实际利率.',
    path: '/tools/money-price',
  },
]

export const paymentTypeDesc = {
  [PaymentType.Annuity]: `等额本息：月供 = 贷款本金 × [年化利率 ÷ 12 × (1 + 年化利率 ÷ 12) ^ 还款月数] ÷ { [ (1 + 年化利率÷ 12) ^ 还款月数] - 1}`,
  [PaymentType.Linear]: `等额本金：月供 = 贷款本金 ÷ 还款月数 x (1 + 年化利率 ÷ 12 x
    剩余还款期数)`,
}
