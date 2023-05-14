// 入参：投资金额，年化收益率，投资天数
// 出参：收益金额，本息总额
import BaiUtils from '@baizixv/utils'

const gain = (investmentAmount, annualRateOfReturn, investmentDays) => {
  const amountOfIncome = (investmentAmount * annualRateOfReturn * investmentDays) / 365
  return {
    amountOfIncome: BaiUtils.MathFunc.toFixed(amountOfIncome, 2),
    // totalPrincipalAndInterest: BaiUtils.MathFunc.toFixed(amountOfIncome + investmentAmount, 2),
  }
}

gain(100, 0.1, 10)

console.log(
  '%c Line:10 🍑 gain(100, 0.1, 10)',
  'font-size:18px;color:#ed9ec7;background:#33a5ff',
  gain(100, 0.1, 10)
)
