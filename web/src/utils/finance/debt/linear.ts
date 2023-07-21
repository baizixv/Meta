import {
  DebtMonthlyParams,
  DebtParamsFirst,
  DebtParamsSencond,
} from '@/typings/pages/tools-package/finance'
import { binarySearch } from '@/utils/common/math'
import { fixed2 } from '@/utils/format/number'

// 等额本金：月供 = 贷款本金 ÷ 还款期数 x (1 + 年化利率 ÷ 总期数 x 剩余还款期数)
// 获取每期还款额度
export const getLinearMonthPay = (
  A: number, // 借贷本金
  n: number, // 借贷期数
  R: number, // 每期利率
  L: number // 剩余期数
): number => {
  // 每月本金
  const B = A / n
  // 每月利息
  const I = A * (L / n) * R
  // 每期还款总额
  const Q = B + I
  return Q
}
// 获取等额本金的利率，二分法逼近进行近似计算. 还可以用牛顿迭代法
export const getLinearRate = ({
  debtMoney,
  debtCount,
  debtTerm,
}: DebtParamsSencond) => {
  // 初始猜测利率范围,等额本息肯定比假定一次性还本付息的利率高,但其实二分法下提升的计算效率不大
  const guessResult = binarySearch(
    {
      low: (debtCount - debtMoney) / debtMoney,
      high: 10000, // 并不会带来计算性能问题，二分法下增加的计算次数是有限的
      precision: 1e-6,
    },
    (guess: number) => {
      let debtCountGuess = 0
      for (let i = 0; i < debtTerm; i++) {
        let restMonths = debtTerm - i
        debtCountGuess += getLinearMonthPay(
          debtMoney,
          debtTerm,
          guess / debtTerm,
          restMonths
        )
      }
      // 近似利率下，猜测的总还款高于实际，本金计算剩余，说明近似比实际大了,调低高位
      // 近似利率下，猜测的总还款小于实际，本金计算负值，说明近似比实际小了,调高低位
      let balance = debtCountGuess - debtCount

      return balance
    }
  )
  // 利率百分比后保留四位小数
  return +fixed2(guessResult * 100) / 100
}

// 获取等额本金月供账单
export const getLinearMonthPayArray = ({
  debtMoney,
  debtRate,
  debtTerm,
}: DebtParamsFirst): DebtMonthlyParams[] => {
  const monthlyPrincipal = debtMoney / debtTerm

  const resultArray: DebtMonthlyParams[] = []

  let totalPrincipal = 0 // 累计本金
  let totalInterest = 0 // 累计利息

  for (let i = 0; i < debtTerm; i++) {
    const restMonths = debtTerm - i
    const monthlyPayInterest =
      getLinearMonthPay(debtMoney, debtTerm, debtRate / debtTerm, restMonths) -
      monthlyPrincipal
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

  return debtMonthArray
}
