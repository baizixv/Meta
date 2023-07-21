import { PaymentTypeEnum } from '@/typings/configs/common'
import { ToolCardConfig } from '@/typings/pages/webtools'

export const financeListConfigs: ToolCardConfig[] = [
  {
    key: 'debt-bill',
    name: '借贷月供计算',
    description: '提供借贷月供计算，生成月供账单。或者根据月供推算年化利率.',
    path: '/tools/money-price',
  },
]

export const paymentTypeDesc: Record<PaymentTypeEnum, string> = {
  [PaymentTypeEnum.Annuity]: `等额本息：月供 = 贷款本金 × [年化利率 ÷ 12 × (1 + 年化利率 ÷ 12) ^ 还款月数] ÷ { [ (1 + 年化利率÷ 12) ^ 还款月数] - 1}`,
  [PaymentTypeEnum.Linear]: `等额本金：月供 = 贷款本金 ÷ 还款月数 x (1 + 年化利率 ÷ 12 x
    剩余还款期数)`,
}

export const initialFormValues = {
  debtMoney: 10000,
  debtTerm: 12,
  debtRate: 0.24,
  debtCount: 11347.15,
  debtPaymentType: PaymentTypeEnum.Annuity,
  computeModel: 'debt-list',
}
