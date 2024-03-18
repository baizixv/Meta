import Decimal from 'decimal.js'
import { FinanceBasicParams } from '@/typings/common/finance'
import {
  convertBigNumberObjToNumber,
  convertToBigNumber,
  convertToNumber,
} from '@/utils/common/big-number'

// 获取终值系数
export const getFVIF = ({ rate = 0, timeCount = 0 }: FinanceBasicParams): Decimal => {
  const [rBig, tBig] = convertToBigNumber([rate, timeCount])

  // FVIF =  (1 + r) ** t
  const FVIF = rBig.plus(1).pow(tBig)

  return FVIF
}

// 获取每期终值系数
export const getFVIFTerms = ({
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): Decimal[] => {
  let FVIFTerms: Decimal[] = []
  for (let i = 1; i <= convertToNumber(timeCount); i++) {
    const FVIF = getFVIF({
      rate,
      timeCount: i,
    })
    FVIFTerms.push(FVIF)
  }

  return FVIFTerms
}

// 获取终值
export const getFV = ({
  PV = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): Decimal => {
  const [ABig] = convertToBigNumber([PV])
  const FVIF = getFVIF({
    rate,
    timeCount,
  })

  const FV = ABig.times(FVIF)

  return FV
}

// 获取每期终值数组
export const getFVTerms = ({
  PV = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): Decimal[] => {
  const [ABig] = convertToBigNumber([PV])

  // 获取终值系数数组
  const FVIFTerms = getFVIFTerms({ rate, timeCount })

  const FVTerms = FVIFTerms.map(item => ABig.times(item))

  return FVTerms
}

// 获取单利终值，仅计算单利利润
export const getFVSimple = ({
  PV = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): Decimal => {
  const [ABig] = convertToBigNumber([PV])
  const interestSimple = getInterestSimple({ PV, rate, timeCount })

  const FVSimple = ABig.plus(interestSimple)

  return FVSimple
}

// 获取单利终值每期数组，仅计算每期单利利润
export const getFVSimpleTerms = ({
  PV = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): Decimal[] => {
  const [ABig] = convertToBigNumber([PV])
  const interestSimpleTerm = getInterestSimpleTerm({ PV, rate, timeCount })

  let FVSimpleTerms: Decimal[] = []
  for (let i = 1; i <= convertToNumber(timeCount); i++) {
    const FVIFTerm = ABig.plus(interestSimpleTerm.times(i))
    FVSimpleTerms.push(FVIFTerm)
  }
  return FVSimpleTerms
}

// 获取每期的单利利润
export const getInterestSimpleTerm = ({
  PV: A = 0,
  rate: r = 0,
  timeCount: t = 0,
}: FinanceBasicParams): Decimal => {
  const [ABig, rBig] = convertToBigNumber([A, r])
  const interestSimpleTerm = ABig.times(rBig)
  return interestSimpleTerm
}

// 获取单利利润总和
export const getInterestSimple = ({
  PV = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): Decimal => {
  const tBig = convertToBigNumber(timeCount)

  // 每期的单利
  const interestSimpleTerm = getInterestSimpleTerm({
    PV,
    rate,
    timeCount,
  })

  const interestSimple = interestSimpleTerm.times(tBig)

  return interestSimple
}

// 获取每期的复利利润
export const getInterestTermCompound = ({
  PV = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): Decimal[] => {
  const [ABig, rBig] = convertToBigNumber([PV, rate])
  let interestCompoundTerms = [] as Decimal[]

  // 迭代累加
  let interestCompound = convertToBigNumber(0)
  for (let i = 1; i <= convertToNumber(timeCount); i++) {
    for (let j = 2; j <= i; j++) {
      interestCompound = rBig.pow(j).times(ABig).plus(interestCompound)
    }
    interestCompoundTerms.push(interestCompound)
  }
  return interestCompoundTerms
}

// 获取复利利润总和
export const getInterestCompound = (
  { PV = 0, rate = 0, timeCount = 0 }: FinanceBasicParams,
  modelAdd = false // true-累加法,false-减差法，
): Decimal => {
  const [ABig] = convertToBigNumber([PV])
  // 两种方法，总和减差和迭代累加
  if (modelAdd) {
    // 迭代累加
    // 每年复利利润数组
    const interestCompoundTerms = getInterestTermCompound({
      PV,
      rate,
      timeCount,
    })
    const interestCompound = interestCompoundTerms.reduce((acc, curr) => {
      return acc.plus(curr)
    }, convertToBigNumber(0))

    return interestCompound
  } else {
    // 总和减差
    // 终值总和
    const FV = getFV({ PV, rate, timeCount })
    // 单利
    const interestSimple = getInterestSimple({ PV, rate, timeCount })
    // 复利
    const interestCompound = FV.minus(ABig).minus(interestSimple)

    return interestCompound
  }
}

// 获取利润每期数组
export const getInterestTerms = ({
  PV = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): Decimal[] => {
  // 每期单利利润
  const interestSimpleTerm = getInterestSimpleTerm({
    PV,
    rate,
    timeCount,
  })

  // 每期复利利润
  const interestCompoundTerms = getInterestTermCompound({
    PV,
    rate,
    timeCount,
  })

  const interestTerms = interestCompoundTerms.map(item =>
    item.plus(interestSimpleTerm)
  )

  return interestTerms
}

// 获取利润总和
export const getInterest = ({
  PV = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): Decimal => {
  const interestSimple = getInterestSimple({ PV, rate, timeCount })
  const interestCompound = getInterestCompound({
    PV,
    rate,
    timeCount,
  })
  const interestCount = interestSimple.plus(interestCompound)

  return interestCount
}

// 获取终值的详细信息
export const getFVDetailInfo = (
  { PV = 0, rate = 0, timeCount = 0 }: FinanceBasicParams,
  needBigNumber = false
): Record<string, any> => {
  const financeBasicParams = { PV, rate, timeCount }

  // 单利
  const interestSimple = getInterestSimple(financeBasicParams)
  // 每期单利
  const interestSimpleTerm = getInterestSimpleTerm(financeBasicParams)
  // 复利
  const interestCompound = getInterestCompound(financeBasicParams)
  // 复利数组
  const interestCompoundTerms = getInterestTermCompound(financeBasicParams)
  // 利润数组
  const interestTerms = getInterestTerms(financeBasicParams)
  // 利润总和
  const interest = getInterest(financeBasicParams)
  // 终值系数
  const FVIF = getFVIF(financeBasicParams)
  // 终值系数数组
  const FVIFTerms = getFVIFTerms(financeBasicParams)
  // 终值
  const FV = getFV(financeBasicParams)
  // 终值数组
  const FVTerms = getFVTerms(financeBasicParams)
  // 单利终值
  const FVSimple = getFVSimple(financeBasicParams)
  // 单利终值数组
  const FVSimpleTerms = getFVSimpleTerms(financeBasicParams)

  const detailResult = {
    FVIF,
    FVIFTerms,
    FV,
    FVTerms,
    FVSimple,
    FVSimpleTerms,

    interest,
    interestTerms,
    interestSimple,
    interestSimpleTerm,
    interestCompound,
    interestCompoundTerms,

    PV: convertToBigNumber(PV),
    rate: convertToBigNumber(rate),
    timeCount: convertToBigNumber(timeCount),
  }

  return needBigNumber
    ? detailResult
    : convertBigNumberObjToNumber(detailResult)
}
