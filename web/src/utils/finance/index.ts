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

// 获取等额本金的利率
export const getLinearRate = ({
  debtMoney,
  debtCount,
  debtTerm,
}: DebtParamsSencond) => {}

// 等额本息：月供 = 贷款本金 × [年化利率 ÷ 12 × (1 + 年化利率 ÷ 12) ^ 还款月数] ÷ { [ (1 + 年化利率÷ 12) ^ 还款月数] - 1}
export const getAnnuityMonthlyPayment = ({
  debtMoney: A,
  debtRate,
  debtTerm: n,
}: DebtParamsFirst) => {
  // 月利率
  const R = debtRate / 12

  // 等额本息辅助计算公式
  const cR = (1 + R) ** n

  // 每月偿还总额
  const monthMoney = (A * (R * cR)) / (cR - 1)

  const resultArray: DebtMonthlyParams[] = []

  let totalRest = A // 剩余本金
  let totalPrincipal = 0 // 累计本金
  let totalInterest = 0 // 累计利息

  // 每月偿还本金
  for (let i = 0; i < n; i++) {
    // 每月偿还利息, 当前剩余本金*月利率
    const currInterest = totalRest * R
    // 每月偿还本金，每月还款总额 - 每月偿还利息
    const currPrincipal = monthMoney - currInterest
    // 更新剩余本金和
    totalRest -= currPrincipal

    totalPrincipal += currPrincipal
    totalInterest += currInterest

    const item: DebtMonthlyParams = {
      key: i,
      termIndex: i,
      monthlyPrincipal: currPrincipal,
      monthlyPayInterest: currInterest,
      monthlyPay: monthMoney,
      countPayPrincipal: totalPrincipal,
      countPayInterest: totalInterest,
      restPayPrincipal: A - totalPrincipal,
      restPayInterest: 0,
      isLast: false,
    }

    if (i === n - 1) {
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
    debtMoney: A,
    debtRate,
    totalInterest,
    debtMonthArray,
  }
}

// 获取等额本息的利率
export const getAnnuityRate = ({
  debtMoney,
  debtCount,
  debtTerm,
}: DebtParamsSencond) => {}
