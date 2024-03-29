import { MoneyUnitTypeEnum } from '@/typings/configs/common'

// 借贷利率计算，相关参数类型
export interface DebtParams {
  debtMoney: number // 贷款本金
  debtTerm: number // 还款月数
  debtRate: number // 年化利率
  debtCount: number // 总还款额
}

export type DebtParamsFirst = Omit<DebtParams, 'debtCount'>

export type DebtParamsSencond = Omit<DebtParams, 'debtRate'>

export interface DebtMonthlyParams {
  key: number
  termIndex: number
  monthlyPay: number
  monthlyPrincipal: number
  monthlyPayInterest: number
  countPayPrincipal: number
  countPayInterest: number
  restPayPrincipal: number
  restPayInterest: number
  isLast: boolean
}

// 借贷计算，展示结果类型
export interface DebtResult {
  debtMoney: number
  debtRate: number
  debtTermArray: DebtMonthlyParams[] // 还款月供
  totalInterest: number // 还款总利息
  debtIrrRate?: number
  debtCycleUnitRatio?: number // 计息周期系数，表示一年有多少个该周期
  debtTerm?: number // 计息周期
  moneyUnit?: MoneyUnitTypeEnum // 金额单位
}
