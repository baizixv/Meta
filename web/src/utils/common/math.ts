// 数值的二分查找法, 一种实现，看具体业务
export const binarySearch = (
  {
    low, // 初始低位
    high, // 初始高位
    precision, // 精度或者步长
  }: Record<'low' | 'high' | 'precision', number>,
  callBack: Function // 比较函数
): number => {
  // let n = 0
  while (low <= high) {
    let mid = (low + high) / 2
    const result = callBack(mid)
    if (Math.abs(result) < precision) {
      return mid
    } else if (result > 0) {
      high = mid - precision
    } else {
      low = mid + precision
    }
    // n++
  }
  return (low + high) / 2
}
