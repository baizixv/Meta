import { DebtResult } from '@/typings/pages/tools-package/finance/money-price'
import { fixed2 } from '@/utils/format/number'

export const useAction = (debtResult: DebtResult, debtAccuracy: number) => {
  const {
    debtMoney,
    debtRate,
    totalInterest,
    debtCycleUnitRatio = 1,
    // debtTerm = 1,
  } = debtResult
  const captionShows = [
    ['利息总额：', `${fixed2(totalInterest)}元`],
    ['还款总额：', `${fixed2(+debtMoney + +totalInterest)}元`],
  ]

  if (debtCycleUnitRatio > 0) {
    const APR = debtRate * debtCycleUnitRatio
    // const EAR = (1 + APR / debtTerm) ** debtTerm - 1

    captionShows.unshift(
      ['年百分率(APR):', `${fixed2(APR * 100, debtAccuracy)}%`]
      //   ['有效年利率(EAR):', `${fixed2(EAR * 100, debtAccuracy)}%`]
    )
  }

  return { captionShows }
}
