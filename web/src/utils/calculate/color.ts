export const getTimeColor = (timestamp: number): string => {
  const seconds = new Date(timestamp).getSeconds()
  const color = `rgb(${seconds * 4}, ${255 - seconds * 4}, 0)`
  return color
}
