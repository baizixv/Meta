import { getWeekDay } from '../calculate/date'
// 根据时间戳获取，年月日时分秒
const getDate = (timestamp: number) => {
  const newStr = new Date(timestamp)
  const y = newStr.getFullYear()
  const m = newStr.getMonth() + 1
  const d = newStr.getDate()
  const h = newStr.getHours()
  const min = newStr.getMinutes()
  const s = newStr.getSeconds()
  return [y, m, d, h, min, s]
}
// 补零
const z = (n: number): string => (n < 10 ? `0${n}` : `${n}`)

// 格式化时间，形如 "2023/06/06 周二 19:47:04"
export const formatData = (timestamp: number): string => {
  const [y, m, d, h, min, s] = getDate(timestamp)

  const weekday = getWeekDay(timestamp)

  return `${y}/${z(m)}/${z(d)} ${weekday} ${z(h)}:${z(min)}:${z(s)}`
}

// 格式化时间，形如 "2023-06-06",连接符号可以指定
export const formatDate = (timestamp: number, connectStr: string = '-'): string => {
  const [y, m, d] = getDate(timestamp)
  return `${y}${connectStr}${z(m)}${connectStr}${z(d)}`
}
