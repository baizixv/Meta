import BigNumber from 'bignumber.js'
import { binarySearch } from '@/utils/common/math'
// 概念：IRR，NPV，现值PV，终值FV，现金流，
// 利率，名义利率，真实利率，声称利率，折现率，回报率，机会成本，贴现率
// 利用二分法，进行逼近近似求解
export const calculateIRR = (cashFlows: number[]) => {
  const guessRate = binarySearch(
    {
      low: -10000, // 初始化下界
      high: 10000, // 初始化上界
      precision: 1e-6,
    },
    (rate: number) => {
      const rateBig = new BigNumber(1 + rate)
      let npvBig = new BigNumber(0) // 净现值
      for (let i = 0; i < cashFlows.length; i++) {
        // 根据IRR的猜测值计算净现值,
        // IRR: 资金流入现值总额与资金流出现值总额相等、净现值等于零时的折现率；
        // npv += cashFlows[i] / Math.pow(1 + rate, i)

        const A = new BigNumber(cashFlows[i])
        const B = rateBig.pow(i)

        npvBig = npvBig.plus(A.dividedBy(B))
      }
      const npvResult = +npvBig.toString()
      // 试算法计算IRR时，如果用试算的利率算出来的净现值大于等于0，说明这个利率还是比IRR小，应该往上测。
      // 这是因为，折现率与现值成反方向变动，而IRR是使得净现值等于0的折现率。
      // 因为我定义的通用二分法是结果大于0，调整上界，所以这里取负
      return -npvResult
    }
  )
  return guessRate
}
