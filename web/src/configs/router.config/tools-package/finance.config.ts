import { APRTypeEnum, PaymentTypeEnum } from '@/typings/configs/common'
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
    name: '借贷计算',
    description: '提供借贷计算，生成账单。或者根据还款推算利率.',
    path: '/tools/money-price',
  },
  {
    key: 'commont-tools',
    name: '通用理财工具',
    description: '提供理财简单的计算工具.如APR和EPR转换',
    path: '/tools/commont-tools',
  },
]

export const paymentTypeDesc: Record<string, string> = {
  [PaymentTypeEnum.Annuity]: `等额本息：月供 = 贷款本金 × [年化利率 ÷ 12 × (1 + 年化利率 ÷ 12) ^ 还款月数] ÷ { [ (1 + 年化利率÷ 12) ^ 还款月数] - 1}`,
  [PaymentTypeEnum.Linear]: `等额本金：月供 = 贷款本金 ÷ 还款月数 x (1 + 年化利率 ÷ 12 x
    剩余还款期数)`,
}

export const initialMoneyPriceFormValues = {
  debtMoney: 10000,
  debtTerm: 12,
  debtRate: 24,
  debtCount: 11347.15,
  debtCountMonthly: 945.6,
  debtAccuracy: 2,
  debtPaymentType: PaymentTypeEnum.Annuity,
  computeModel: 'debt-list',
  debtCycleUnit: APRTypeEnum.Month,
  payCycleUnit: APRTypeEnum.Month,
}

export const initialRateFormValues = {
  cashFlowStr: '-1000,250,250,250,250,250',
  rateType: 'term',
  rateAccuracy: 2,
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

export const rateHelpInfos = [
  '1. Internal Rate of Return，内部收益率',
  '2. 即：资金流入现值总额与资金流出现值总额相等、净现值等于零时的折现率；',
  '3. 是一项投资渴望达到的报酬率，是能使投资项目净现值等于零时的折现率；',
  '4. 如果不使用电子计算机，需要用若干个折现率进行试算，直至找到净现值等于零或接近于零的那个折现率；',
  '5. IRR实际上是一个收益率试算工具，是一个经过较为复杂的复利计算后得出的数值，不止考虑到了投资收益比，还考虑到了钱的时间价值；',
]

export const termConfigs = [
  { value: 'term', label: '期', count: 0 }, // 注意不要参与计算，0只是表示期这个意思
  { value: 'day', label: '日(360)', count: 360 },
  { value: 'day2', label: '日(365)', count: 365 },
  { value: 'month', label: '月', count: 12 },
  { value: 'quarter', label: '季', count: 4 },
  { value: 'year', label: '年', count: 1 },
]
