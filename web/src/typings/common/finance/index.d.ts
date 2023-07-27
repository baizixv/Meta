import BigNumber from 'bignumber.js'

// 财务计算基础参数
export interface FinanceBasicParams {
  PV?: number | BigNumber // 本金
  rate?: number | BigNumber // 利率
  timeCount?: number | BigNumber // 计息次数，或者周期
}
