import { MoneyUnitTypeEnum, MoneyUnitTypeMap } from '@/typings/configs/common'
import { DebtResult } from '@/typings/pages/tools-package/finance/money-price'
import { fixed2 } from '@/utils/format/number'

export const useAction = (debtResult: DebtResult, debtAccuracy: number) => {
  const {
    debtMoney,
    debtRate,
    totalInterest,
    debtCycleUnitRatio = 1,
    moneyUnit = MoneyUnitTypeEnum.CNY,
    // debtTerm = 1,
  } = debtResult
  const moneyUnitShow = MoneyUnitTypeMap[moneyUnit]
  const captionShows = [
    ['利息总额：', `${moneyUnitShow}${fixed2(totalInterest)}`],
    ['还款总额：', `${moneyUnitShow}${fixed2(+debtMoney + +totalInterest)}`],
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
