// 保留两位小数
export const fixed2 = (num: number, type = 'round'): string => {
  switch (type) {
    case 'floor': // 向下取整
      return (Math.floor(num * 100) / 100).toFixed(2)
    case 'ceil': // 向上取整
      return (Math.ceil(num * 100) / 100).toFixed(2)
    case 'round': // 四舍五入
    default:
      return (Math.round(num * 100) / 100).toFixed(2)
  }
}
