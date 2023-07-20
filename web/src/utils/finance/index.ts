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

// 获取等额本息的利率,二分法茶逼近
export const getAnnuityRate = ({
  debtMoney,
  debtCount,
  debtTerm,
}: DebtParamsSencond) => {
  let guess = 0.1 // 初始猜测利率
  let precision = 1e-3 // 精确度
  let maxIterations = 10 // 最大迭代次数

  // 实际的每月还款额
  const realMonthMoney = debtCount / debtTerm
  console.log(
    '%c Line:194 🍏 realMonthMoney',
    'font-size:18px;color:#465975;background:#93c0a4',
    realMonthMoney
  )

  const getMonthMoneyGuess = (currGuess: number) => {
    // 月利率
    const R = currGuess / 12
    // 等额本息辅助计算公式
    const cR = (1 + R) ** debtTerm
    // 每月偿还总额
    const A = debtMoney
    const monthMoney = (A * (R * cR)) / (cR - 1)
    return monthMoney
  }

  let i = 0
  while (i < maxIterations) {
    const currGuessMonthMoney = getMonthMoneyGuess(guess)

    if (Math.abs(realMonthMoney - currGuessMonthMoney) <= precision) {
      return guess // 返回利率的百分比形式
    }

    guess += 0.0001 // 每次增加0.1%的利率猜测
    i++
  }
  return -1 // 未找到合适的利率
}

