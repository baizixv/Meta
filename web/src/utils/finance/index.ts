import {
  DebtMonthlyParams,
  DebtParamsFirst,
  DebtParamsSencond,
  DebtResult,
} from '@/typings/pages/tools-package/finance'



// 等额本息：月供 = 贷款本金 × [年化利率 ÷ 12 × (1 + 年化利率 ÷ 12) ^ 还款月数] ÷ { [ (1 + 年化利率÷ 12) ^ 还款月数] - 1}

// 获取等额本金的利率，TODO-理解
export const getLinearRate = ({
  debtMoney,
  debtCount,
  debtTerm,
}: DebtParamsSencond) => {
  let guess = 0.1 // 初始猜测的年利率
  let error = 1e-6 // 允许的误差范围

  let monthlyRate = guess / 12 // 每月利率
  let monthlyPrincipal = debtMoney / debtTerm // 每月本金
  let totalInterest = 0

  for (let i = 0; i < debtTerm; i++) {
    let interest = debtMoney * monthlyRate
    totalInterest += interest
    debtMoney -= monthlyPrincipal
  }

  let totalPayment = debtMoney + totalInterest // 总还款额

  // 牛顿迭代法
  while (Math.abs(totalPayment - debtCount) > error) {
    let derivative = 0 // 演算值
    let numerator = 0 // 分子
    let denominator = 0 // 分母

    for (let i = 0; i < debtTerm; i++) {
      let power = Math.pow(1 + monthlyRate, i)
      numerator += (i + 1) * power
      denominator += power
    }

    derivative = (monthlyPrincipal * numerator) / (denominator * denominator)
    guess -= (totalPayment - debtCount) / derivative

    monthlyRate = guess / 12
    totalInterest = 0
    debtMoney = debtMoney / debtTerm

    for (let i = 0; i < debtTerm; i++) {
      let interest = debtMoney * monthlyRate
      totalInterest += interest
      debtMoney -= monthlyPrincipal
    }

    totalPayment = debtMoney + totalInterest
  }

  return guess // 返回实际年利率
}

export { getLinearMonthPayArray } from './debt/linear'
export {
  getAnnuityMonthPay,
  getAnnuityRate,
  getAnnuityMonthPayArray,
} from './debt/annuity'


