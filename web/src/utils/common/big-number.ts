import BigNumber from 'bignumber.js'

// 将普通数字包装为大数
export const convertToBigNumber = <
  T extends (number | BigNumber) | (number | BigNumber)[],
  U = T extends number | BigNumber ? BigNumber : BigNumber[]
>(
  srcNum: T
): U => {
  return Array.isArray(srcNum)
    ? (srcNum.map(num => new BigNumber(num)) as U)
    : (new BigNumber(srcNum) as U)
}

// 将大数转换为普通数字
export const convertToNumber = <
  T extends (number | BigNumber) | (number | BigNumber)[],
  U = T extends number | BigNumber ? number : number[]
>(
  srcBigNum: T
): U => {
  return Array.isArray(srcBigNum)
    ? (srcBigNum.map(num => convertToNumberSingle(num)) as U)
    : (convertToNumberSingle(srcBigNum) as U)
}

// 将单个大数转为普通数字
const convertToNumberSingle = <T extends number | BigNumber>(
  prevNum: T
): number => {
  if (typeof prevNum === 'number') {
    return prevNum
  } else {
    return +prevNum.toString()
  }
}

// 将大数对象转换为普通数字对象
export const convertBigNumberObjToNumber = (bigNumObj: Record<string, any>) => {
  const newObj = {} as Record<string, any>
  Object.entries(bigNumObj).forEach(([key, value]) => {
    let newValue = 0 as any

    if (value instanceof BigNumber || typeof value === 'number') {
      newValue = convertToNumberSingle(value as BigNumber | number)
    } else if (Array.isArray(value)) {
      newValue = value.map(item => convertToNumberSingle(item))
    } else {
      newValue = convertBigNumberObjToNumber(value as Record<string, any>)
    }

    newObj[key] = newValue
  })

  return newObj
}
