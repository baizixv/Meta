import BigNumber from 'bignumber.js'
import { FinanceBasicParams } from '@/typings/common/finance'
import {
  convertBigNumberObjToNumber,
  convertToBigNumber,
  convertToNumber,
} from '@/utils/common/big-number'

// 获取终值系数
export const getFVIF = ({
  rate: r = 0,
  timeCount: t = 0,
}: FinanceBasicParams): BigNumber => {
  const [rBig, tBig] = convertToBigNumber([r, t])

  // FVIF =  (1 + r) ** t
  const FVIF = rBig.plus(1).pow(tBig)

  return FVIF
}

// 获取每期终值系数
export const getFVIFTerms = ({
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): BigNumber[] => {

  let FVIFTerms: BigNumber[] = []
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
  princialCount: A = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): BigNumber => {
  const [ABig] = convertToBigNumber([A])
  const FVIF = getFVIF({
    rate,
    timeCount,
  })

  const FV = ABig.multipliedBy(FVIF)

  return FV
}

// 获取每期终值数组
export const getFVTerms = ({
  princialCount = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): BigNumber[] => {
  const [ABig] = convertToBigNumber([princialCount])

  // 获取终值数组
  const FVIFTerms = getFVIFTerms({ rate, timeCount })
  
  const FVTerms = FVIFTerms.map(item => ABig.multipliedBy(item))

  return FVTerms
}

// 获取每年的单利利润
export const getInterestSimpleTerm = ({
  princialCount: A = 0,
  rate: r = 0,
  timeCount: t = 0,
}: FinanceBasicParams): BigNumber => {
  const [ABig, rBig] = convertToBigNumber([A, r])
  const interestSimpleTerm = ABig.multipliedBy(rBig)
  return interestSimpleTerm
}

// 获取单利利润总和
export const getInterestSimple = ({
  princialCount = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): BigNumber => {
  const tBig = convertToBigNumber(timeCount)

  // 每期的单利
  const interestSimpleTerm = getInterestSimpleTerm({
    princialCount,
    rate,
    timeCount,
  })

  const interestSimple = interestSimpleTerm.multipliedBy(tBig)

  return interestSimple
}

// 获取每期的复利利润
export const getInterestTermCompound = ({
  princialCount = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): BigNumber[] => {
  const [ABig, rBig] = convertToBigNumber([princialCount, rate])
  let interestCompoundTerms = [] as BigNumber[]

  // 迭代累加
  let interestCompound = convertToBigNumber(0)
  for (let i = 1; i <= convertToNumber(timeCount); i++) {
    for (let j = 2; j <= i; j++) {
      interestCompound = rBig.pow(j).multipliedBy(ABig).plus(interestCompound)
    }
    interestCompoundTerms.push(interestCompound)
  }
  return interestCompoundTerms
}

// 获取复利利润总和
export const getInterestCompound = (
  { princialCount = 0, rate = 0, timeCount = 0 }: FinanceBasicParams,
  modelAdd = false // true-累加法,false-减差法，
): BigNumber => {
  const [ABig] = convertToBigNumber([princialCount])
  // 两种方法，总和减差和迭代累加
  if (modelAdd) {
    // 迭代累加
    // 每年复利利润数组
    const interestCompoundTerms = getInterestTermCompound({
      princialCount,
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
    const FV = getFV({ princialCount, rate, timeCount })
    // 单利
    const interestSimple = getInterestSimple({ princialCount, rate, timeCount })
    // 复利
    const interestCompound = FV.minus(ABig).minus(interestSimple)

    return interestCompound
  }
}

// 获取利润每期数组
export const getInterestTerms = ({
  princialCount = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): BigNumber[] => {
  // 每期单利利润
  const interestSimpleTerm = getInterestSimpleTerm({
    princialCount,
    rate,
    timeCount,
  })

  // 每期复利利润
  const interestCompoundTerms = getInterestTermCompound({
    princialCount,
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
  princialCount = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): BigNumber => {
  const interestSimple = getInterestSimple({ princialCount, rate, timeCount })
  const interestCompound = getInterestCompound({
    princialCount,
    rate,
    timeCount,
  })
  const interestCount = interestSimple.plus(interestCompound)

  return interestCount
}

// 获取终值的详细信息
export const getFVDetailInfo = (
  { princialCount = 0, rate = 0, timeCount = 0 }: FinanceBasicParams,
  needBigNumber = false
): Record<string, any> => {
  const financeBasicParams = { princialCount, rate, timeCount }
  // 终值总和
  const FV = getFV(financeBasicParams)
  // 每年的单利
  const interestSimpleTerm = getInterestSimpleTerm(financeBasicParams)
  // 单利
  const interestSimple = getInterestSimple(financeBasicParams)
  // 每年的复利
  const interestCompoundTerms = getInterestTermCompound(financeBasicParams)
  // 复利
  const interestCompound = getInterestCompound(financeBasicParams)
  // 终值系数
  const FVIF = getFVIF(financeBasicParams)
  // 终值系数数组
  const FVIFTerms = getFVIFTerms(financeBasicParams)
  // 终值数组
  const FVTerms = getFVTerms(financeBasicParams)
  // 利润数组
  const interestTerms = getInterestTerms(financeBasicParams)
  // 利润总和
  const interest = getInterest(financeBasicParams)

  const detailResult = {
    princialCount: convertToBigNumber(princialCount),
    rate: convertToBigNumber(rate),
    timeCount: convertToBigNumber(timeCount),
    FVIF,
    FVIFTerms,
    FV,
    FVTerms,
    interestSimple,
    interestSimpleTerm,
    interestCompound,
    interestCompoundTerms,
    interest,
    interestTerms,
  }

  return needBigNumber
    ? detailResult
    : convertBigNumberObjToNumber(detailResult)
}
