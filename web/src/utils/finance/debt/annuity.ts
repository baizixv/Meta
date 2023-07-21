import { DebtParamsSencond } from '@/typings/pages/tools-package/finance'
import { binarySearch } from '@/utils/common/math'
import { fixed2 } from '@/utils/format/number'

// 等额本息
// 获取每期还款额度
export const getAnnuityMonthPay = (
  A: number, // 借贷额度
  n: number, // 借贷期数
  R: number // 每期利率
): number => {
  // 等额本息辅助计算公式
  const C = (1 + R) ** n
  // 每期偿还总额
  const M = (R * C) / (C - 1)
  const Q = A * M
  // 每期还款总额
  return Q
}
// 等额本息，获取月供账单

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
      high: 1,
      precision: 1e-6,
    },
    (guess: number) => {
      const monthlyPayGuess = getAnnuityMonthPay(
        debtMoney,
        debtTerm,
        guess / debtTerm
      )
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
