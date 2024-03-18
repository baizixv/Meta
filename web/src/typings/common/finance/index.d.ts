import Decimal from 'decimal.js'

// 财务计算基础参数
export interface FinanceBasicParams {
  PV?: number | Decimal // 现值，或者说本金
  rate?: number | Decimal // 利率，贴现率
  timeCount?: number | Decimal // 计息次数，或者周期
  FV?: number | Decimal // 终值
}
