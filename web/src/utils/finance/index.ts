import {
  DebtMonthlyParams,
  DebtParamsFirst,
  DebtParamsSencond,
  DebtResult,
} from '@/typings/pages/tools-package/finance'

// 等额本金：月供 = 贷款本金 ÷ 还款月数 x (1 + 年化利率 ÷ 12 x 剩余还款期数)
export const getLinearMonthlyPayMent = ({
  debtMoney,
  debtRate,
  debtTerm,
}: DebtParamsFirst): DebtResult => {
  const monthlyPrincipal = debtMoney / debtTerm

  const resultArray: DebtMonthlyParams[] = []

  let totalPrincipal = 0 // 累计本金
  let totalInterest = 0 // 累计利息

  for (let i = 0; i < debtTerm; i++) {
    const restMonths = debtTerm - i
    const monthlyPayInterest =
      debtMoney * (restMonths / debtTerm) * (debtRate / 12)

    totalPrincipal += monthlyPrincipal
    totalInterest += monthlyPayInterest

    const item: DebtMonthlyParams = {
      key: i,
      termIndex: i,
      monthlyPrincipal,
      monthlyPayInterest,
      monthlyPay: monthlyPrincipal + monthlyPayInterest,
      countPayPrincipal: totalPrincipal,
      countPayInterest: totalInterest,
      restPayPrincipal: debtMoney - totalPrincipal,
      restPayInterest: 0,
      isLast: false,
    }

    if (i === debtTerm - 1) {
      item.isLast = true
    }

    resultArray.push(item)
  }
  const debtMonthArray: DebtMonthlyParams[] = resultArray.map(ele => {
    return {
      ...ele,
      restPayInterest: totalInterest - ele.countPayInterest,
    }
  })

  return {
    debtMoney,
    debtRate,
    totalInterest,
    debtMonthArray,
  }
}

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

export {} from './debt/linear'
export {
  getAnnuityMonthPay,
  getAnnuityRate,
  getAnnuityMonthPayArray,
} from './debt/annuity'


