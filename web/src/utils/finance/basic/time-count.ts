// 求解期数
import { FinanceBasicParams } from '@/typings/common/finance'
import {
  convertBigNumberObjToNumber,
  convertToBigNumber,
} from '@/utils/common/big-number'
import Decimal from 'decimal.js'

// 获取投资期数
export const getDiscountTerm = ({
  PV = 0,
  FV = 0,
  rate = 0,
}: FinanceBasicParams): Decimal => {
  const [PVBig, FVBig, rBig] = convertToBigNumber([PV, FV, rate])
  // 基本现值等式：PV = FV * (1 / (1 + r) ** t),求r
  // (1 + r) ** t = FV / PV
  // t = lg(1+r)|(FV/PV)
  // t = ln(FV/PV) / ln(1+r), 换底公式
  const RatioLnBig = FVBig.div(PVBig).ln() // FV / PV
  const addOneRLnBig = rBig.plus(1).ln()
  const tBig = RatioLnBig.div(addOneRLnBig)
  return tBig
}

// 获取贴现率详细信息
export const getDiscountTermDetailInfo = (
  { PV = 0, FV = 0, rate = 0 }: FinanceBasicParams,
  needBigNumber = false
): Record<string, any> => {
  const financeBasicParams = { PV, FV, rate }
  const timeCount = getDiscountTerm(financeBasicParams)
  const detailResult = {
    timeCount,
  }

  return needBigNumber
    ? detailResult
    : convertBigNumberObjToNumber(detailResult)
}
