import {
  DebtMonthlyParams,
  DebtParamsFirst,
} from '@/typings/pages/tools-package/finance'

// 等额本金：月供 = 贷款本金 ÷ 还款月数 x (1 + 年化利率 ÷ 12 x 剩余还款期数)
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

  return debtMonthArray
}
