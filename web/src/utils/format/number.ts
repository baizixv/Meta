// 保留两位小数
export const fixed2 = (num: number, per = 2, type = 'round'): string => {
  const perNum = 10 ** per
  switch (type) {
    case 'floor': // 向下取整
      return (Math.floor(num * perNum) / perNum).toFixed(per)
    case 'ceil': // 向上取整
      return (Math.ceil(num * perNum) / perNum).toFixed(per)
    case 'round': // 四舍五入
    default:
      return (Math.round(num * perNum) / perNum).toFixed(per)
  }
}
