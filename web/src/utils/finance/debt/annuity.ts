import BigNumber from 'bignumber.js'
import {
  DebtMonthlyParams,
  DebtParamsFirst,
  DebtParamsSencond,
} from '@/typings/pages/tools-package/finance/money-price'
import { binarySearch } from '@/utils/common/math'
import { fixed2 } from '@/utils/format/number'

// 等额本息：月供 = 贷款本金 × [年化利率 ÷ 12 × (1 + 年化利率 ÷ 12) ^ 还款月数] ÷ { [ (1 + 年化利率÷ 12) ^ 还款月数] - 1}
// 获取每期还款额度
export const getAnnuityMonthPay = (
  A: number, // 借贷本金
  n: number, // 借贷期数
  R: number // 每期利率
): number => {
  // 防止金融计算，中间结果溢出，使用大数计算
  // 等额本息辅助计算公式
  const BigA = new BigNumber(A)
  const BigN = new BigNumber(n)
  const BigR = new BigNumber(R)

  const C = BigR.plus(1).pow(BigN)

  // 每期偿还中间结果
  const T = C.dividedBy(C.minus(1))

  // 每期还款总额
  const Q = BigA.times(BigR).times(T) 

  const QNumber = +Q.toString()
  return QNumber
}
// 获取等额本息的利率,二分法逼近进行近似计算
export const getAnnuityRate = ({
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
      const monthlyPayGuess = getAnnuityMonthPay(debtMoney, debtTerm, guess)
      const monthlyPayReal = debtCount / debtTerm
      // 近似利率下，猜测的月供高于实际，本金计算剩余，说明近似比实际大了,调低高位
      // 近似利率下，猜测的月供小于实际，本金计算负值，说明近似比实际小了，调高低位
      let balance = monthlyPayGuess - monthlyPayReal

      return balance
    }
  )
  // 利率百分比后保留四位小数
  return +fixed2(guessResult * 100) / 100
}

// 获取等额本息月供账单
export const getAnnuityMonthPayArray = ({
  debtMoney,
  debtRate,
  debtTerm,
}: DebtParamsFirst): DebtMonthlyParams[] => {
  // 每期利率
  const R = debtRate
  // 每期偿还总额
  const monthMoney = getAnnuityMonthPay(debtMoney, debtTerm, R)

  const resultArray: DebtMonthlyParams[] = []

  let totalRest = debtMoney // 剩余本金
  let totalPrincipal = 0 // 累计本金
  let totalInterest = 0 // 累计利息

  // 每期偿还本金
  for (let i = 0; i < debtTerm; i++) {
    // 每期偿还利息, 当前剩余本金*月利率
    const currInterest = totalRest * R
    // 每期偿还本金，每期还款总额 - 每期偿还利息
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
      restPayPrincipal: debtMoney - totalPrincipal,
      restPayInterest: 0,
      isLast: false,
    }

    if (i === debtTerm - 1) {
      item.isLast = true
    }

    resultArray.push(item)
  }

  const debtTermArray: DebtMonthlyParams[] = resultArray.map(ele => {
    return {
      ...ele,
      restPayInterest: totalInterest - ele.countPayInterest,
    }
  })
  console.log(
    '%c Line:108 🍌 debtTermArray',
    'font-size:18px;color:#ed9ec7;background:#7f2b82',
    debtTermArray
  )
  return debtTermArray
}
