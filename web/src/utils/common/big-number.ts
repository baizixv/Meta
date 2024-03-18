import Decimal from 'decimal.js'

// 将普通数字包装为大数
export const convertToBigNumber = <
  T extends (number | Decimal) | (number | Decimal)[],
  U = T extends number | Decimal ? Decimal : Decimal[]
>(
  srcNum: T
): U => {
  return Array.isArray(srcNum)
    ? (srcNum.map(num => new Decimal(num)) as U)
    : (new Decimal(srcNum) as U)
}

// 将大数转换为普通数字
export const convertToNumber = <
  T extends (number | Decimal) | (number | Decimal)[],
  U = T extends number | Decimal ? number : number[]
>(
  srcBigNum: T
): U => {
  return Array.isArray(srcBigNum)
    ? (srcBigNum.map(num => convertToNumberSingle(num)) as U)
    : (convertToNumberSingle(srcBigNum) as U)
}

// 将单个大数转为普通数字
const convertToNumberSingle = <T extends number | Decimal>(
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

    if (value instanceof Decimal || typeof value === 'number') {
      newValue = convertToNumberSingle(value as Decimal | number)
    } else if (Array.isArray(value)) {
      newValue = value.map(item => convertToNumberSingle(item))
    } else {
      newValue = convertBigNumberObjToNumber(value as Record<string, any>)
    }

    newObj[key] = newValue
  })

  return newObj
}
