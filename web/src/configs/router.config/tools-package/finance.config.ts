import { PaymentTypeEnum } from '@/typings/configs/common'
import { ToolCardConfig } from '@/typings/pages/webtools'

export const financeListConfigs: ToolCardConfig[] = [
  {
    key: 'debt-rate',
    name: '投资回报测算',
    description: '已知投资的预期现金流，对IRR进行计算',
    path: '/tools/rate',
  },
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

export const initialMoneyPriceFormValues = {
  debtMoney: 10000,
  debtTerm: 12,
  debtRate: 0.24,
  debtCount: 11347.15,
  debtCountMonthly: 945.6,
  debtAccuracy: 2,
  debtPaymentType: PaymentTypeEnum.Annuity,
  computeModel: 'debt-list',
}

export const initialRateFormValues = {
  cashFlowStr: '-1000,250,250,250,250,250',
}

export const heloCashFlowsHelpInfos = [
  '1. 和现金流值一一对应，表示当前位置重复几次',
  '2. 用于解决相同值重复输入的问题。',
  '3. 举例，现金流输入为: "-1000, 250", 辅助现金流输入为: "1,5"',
  '4. 实际得到的现金流就为: "-1000,250,250,250,250,250"',
  '5. 默认为1，输入值必须为正整数，',
  '6. 负值和0一律视为1处理，其它非正整数向上取整处理',
  '7. 后续位可缺省，默认为1',
]
