export const getTimeColor = (timestamp: number): string => {
  const seconds = new Date(timestamp).getSeconds()
  const color = `rgb(${seconds * 4}, ${255 - seconds * 4}, 0)`
  return color
}

// 获取随机颜色 16进制
export const getRandomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
