// DCF（贴现现金流量估价）
import { FinanceBasicParams } from '@/typings/common/finance'
import {
  convertBigNumberObjToNumber,
  convertToBigNumber,
  convertToNumber,
} from '@/utils/common/big-number'
import Decimal from 'decimal.js'

// 获取现值系数，也叫贴现系数
export const getPVIF = ({
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): Decimal => {
  const [rBig, tBig] = convertToBigNumber([rate, timeCount])
  // FVIF =  (1 + r) ** t
  const FVIF = rBig.plus(1).pow(tBig)
  // PVIF = 1 / (1 + r) ** t
  const PVIF = convertToBigNumber(1).dividedBy(FVIF)

  return PVIF
}

// 获取每期现值系数
export const getPVIFTerms = ({
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): Decimal[] => {
  let PVIFTerms: Decimal[] = []
  for (let i = convertToNumber(timeCount); i >= 1; i--) {
    const PVIF = getPVIF({
      rate,
      timeCount: i,
    })
    PVIFTerms.push(PVIF)
  }

  return PVIFTerms
}

// 获取现值
export const getPV = ({
  FV = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): Decimal => {
  const [FVBig] = convertToBigNumber([FV])
  const PVIF = getPVIF({
    rate,
    timeCount,
  })
  // 基本现值等式：PV = FV * (1 / (1 + r) ** t)
  const PV = FVBig.times(PVIF)
  return PV
}

// 获取现值数组
export const getPVTerms = ({
  FV = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): Decimal[] => {
  const [FVBig] = convertToBigNumber([FV])

  // 获取现值系数数组
  const PVIFTerms = getPVIFTerms({ rate, timeCount })

  const PVTerms = PVIFTerms.map(item => FVBig.times(item))

  return PVTerms
}

// 获取现值的详细信息
export const getPVDetailInfo = (
  { FV = 0, rate = 0, timeCount = 0 }: FinanceBasicParams,
  needBigNumber = false
): Record<string, any> => {
  const financeBasicParams = { FV, rate, timeCount }

  // 现值系数
  const PVIF = getPVIF(financeBasicParams)
  // 终值系数数组
  const PVIFTerms = getPVIFTerms(financeBasicParams)
  // 终值
  const PV = getPV(financeBasicParams)
  // 终值数组
  const PVTerms = getPVTerms(financeBasicParams)

  const detailResult = {
    PVIF,
    PVIFTerms,
    PV,
    PVTerms,

    FV: convertToBigNumber(FV),
    rate: convertToBigNumber(rate),
    timeCount: convertToBigNumber(timeCount),
  }

  return needBigNumber
    ? detailResult
    : convertBigNumberObjToNumber(detailResult)
}
