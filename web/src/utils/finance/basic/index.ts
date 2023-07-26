import BigNumber from 'bignumber.js'
import { FinanceBasicParams } from '@/typings/common/finance'

// 获取终值系数
export const getFVIF = ({
  rate: r = 0,
  timeCount: t = 0,
}: FinanceBasicParams): number => {
  const rBig = new BigNumber(r)
  const tBig = new BigNumber(t)

  //FVIF =  (1 + r) ** t
  const FVIF = rBig.plus(1).pow(tBig)

  const FVIFResult = +FVIF.toString()

  return FVIFResult
}
