import {
  DebtMonthlyParams,
  DebtParamsFirst,
  DebtParamsSencond,
  DebtResult,
} from '@/typings/pages/tools-package/finance'
import { fixed2 } from '../format/number'
import { getAnnuityMonthPay } from './debt/annuity'

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

// 获取等额本息的利率,二分法逼近进行近似计算
// export const getAnnuityRate = ({
//   debtMoney,
//   debtCount,
//   debtTerm,
// }: DebtParamsSencond) => {
//   // 初始猜测利率范围,等额本息肯定比假定一次性还本付息的利率高,但其实二分法下提升的计算效率不大
//   let low = (debtCount - debtMoney) / debtMoney
//   let high = 1 // 比1要小

//   let guess = 0
//   let precision = 1e-6 // 精确度

//   while (low <= high) {
//     guess = (low + high) / 2
//     let balance =
//       getAnnuityMonthPay(debtMoney, debtTerm, guess / debtTerm) -
//       debtCount / debtTerm
//     if (Math.abs(balance) < precision) {
//       // 精度足够，提前退出
//       break
//     } else if (balance > 0) {
//       // 近似利率下，猜测的月供高于实际，本金计算剩余，说明近似比实际大了,调低高位
//       high = guess - precision
//     } else {
//       // 近似利率下，猜测的月供小于实际，本金计算负值，说明近似比实际小了，调高低位
//       low = guess + precision
//     }
//   }

//   // 利率百分比后保留四位小数
//   guess = +fixed2(guess * 100) / 100

//   return guess
// }



