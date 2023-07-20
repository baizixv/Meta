import {
  DebtMonthlyParams,
  DebtParamsFirst,
  DebtParamsSencond,
} from '@/typings/pages/tools-package/finance'

// 等额本金：月供 = 贷款本金 ÷ 还款月数 x (1 + 年化利率 ÷ 12 x 剩余还款期数)
export const getLinearMonthlyPayMent = ({
  debtMoney,
  debtRate,
  debtTerm,
}: DebtParamsFirst): {
  debtMonthArray: DebtMonthlyParams[] // 还款月供
  totalInterest: number // 还款总利息
} => {
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
  debtMoney,
  debtRate,
  debtTerm,
}: DebtParamsFirst) => {
  const monthlyRate = debtRate / 12
  const count = (1 + monthlyRate) ** debtTerm - 1
  const result =
    (debtMoney * (monthlyRate * (1 + monthlyRate) ** debtTerm)) / count

  return result
}

// 获取等额本息的利率
export const getAnnuityRate = ({
  debtMoney,
  debtCount,
  debtTerm,
}: DebtParamsSencond) => {}
