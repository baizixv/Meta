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
// 获取每年的单利利润
export const getInterestAnnualSimple = ({
  princialCount: A = 0,
  rate: r = 0,
  timeCount: t = 0,
}: FinanceBasicParams): BigNumber => {
  const [ABig, rBig] = convertToBigNumber([A, r])
  const interestAnnualSimple = ABig.multipliedBy(rBig)
  return interestAnnualSimple
}

// 获取单利利润总和
export const getInterestSimple = ({
  princialCount = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): BigNumber => {
  const tBig = convertToBigNumber(timeCount)

  // 每年的单利
  const interestAnnualSimple = getInterestAnnualSimple({
    princialCount,
    rate,
    timeCount,
  })

  const interestSimple = interestAnnualSimple.multipliedBy(tBig)

  return interestSimple
}

// 获取每年的复利利润
export const getInterestAnnualCompound = ({
  princialCount = 0,
  rate = 0,
  timeCount = 0,
}: FinanceBasicParams): BigNumber[] => {
  const [ABig, rBig] = convertToBigNumber([princialCount, rate])
  let interestAnnualCompounds = [] as BigNumber[]

  // 迭代累加
  let interestCompound = convertToBigNumber(0)
  for (let i = 1; i <= convertToNumber(timeCount); i++) {
    for (let j = 2; j <= i; j++) {
      interestCompound = rBig.pow(j).multipliedBy(ABig).plus(interestCompound)
    }
    interestAnnualCompounds.push(interestCompound)
  }
  return interestAnnualCompounds
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
    const interestAnnualCompounds = getInterestAnnualCompound({
      princialCount,
      rate,
      timeCount,
    })
    const interestCompound = interestAnnualCompounds.reduce((acc, curr) => {
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

// 获取终值的详细信息
export const getFVDetailInfo = (
  { princialCount = 0, rate = 0, timeCount = 0 }: FinanceBasicParams,
  needBigNumber = false
): Record<string, any> => {
  // 终值总和
  const FV = getFV({ princialCount, rate, timeCount })
  // 每年的单利
  const interestAnnualSimple = getInterestAnnualSimple({
    princialCount,
    rate,
    timeCount,
  })
  // 单利
  const interestSimple = getInterestSimple({ princialCount, rate, timeCount })
  // 每年的复利
  const interestAnnualCompounds = getInterestAnnualCompound({
    princialCount,
    rate,
    timeCount,
  })
  // 复利
  const interestCompound = getInterestCompound({
    princialCount,
    rate,
    timeCount,
  })
  // 终值系数
  const FVIF = getFVIF({
    rate,
    timeCount,
  })

  const detailResult = {
    FV,
    princialCount: convertToBigNumber(princialCount),
    rate: convertToBigNumber(rate),
    timeCount: convertToBigNumber(timeCount),
    FVIF,
    interestSimple,
    interestAnnualSimple,
    interestCompound,
    interestAnnualCompounds,
  }

  return needBigNumber
    ? detailResult
    : convertBigNumberObjToNumber(detailResult)
}
