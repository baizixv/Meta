import Decimal from 'decimal.js'
import { FinanceBasicParams } from '@/typings/common/finance'
import {
  convertBigNumberObjToNumber,
  convertToBigNumber,
} from '@/utils/common/big-number'

// 获取贴现率
export const getDiscountRate = ({
  PV = 0,
  FV = 0,
  timeCount = 0,
}: FinanceBasicParams): Decimal => {
  const [PVBig, FVBig, tBig] = convertToBigNumber([PV, FV, timeCount])
  //   基本现值等式：PV = FV * (1 / (1 + r) ** t),求r
  //   (1 + r) ** t = FV / PV
  //   r = (FV / PV) ** (1/t) - 1
  const RatioBig = FVBig.dividedBy(PVBig) // FV / PV
  const reciprocalTBig = convertToBigNumber(1).dividedBy(tBig) // 1 / t
  const rBig = RatioBig.pow(reciprocalTBig).minus(1)
  return rBig
}

// 获取贴现率详细信息
export const getDiscountRateDetailInfo = (
  { PV = 0, FV = 0, timeCount = 0 }: FinanceBasicParams,
  needBigNumber = false
): Record<string, any> => {
  const financeBasicParams = { PV, FV, timeCount }
  const rate = getDiscountRate(financeBasicParams)
  const detailResult = {
    rate,
  }

  return needBigNumber
    ? detailResult
    : convertBigNumberObjToNumber(detailResult)
}
