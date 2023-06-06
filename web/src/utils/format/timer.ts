import { getWeekDay } from '../calculate/date'

export const formatData = (timestamp: number): string => {
  const newStr = new Date(timestamp)
  const y = newStr.getFullYear()
  const m = newStr.getMonth() + 1
  const d = newStr.getDate()
  const h = newStr.getHours()
  const min = newStr.getMinutes()
  const s = newStr.getSeconds()
  const z = (n: number): string => (n < 10 ? `0${n}` : `${n}`)
  const weekday = getWeekDay(timestamp)

  return `${y}/${z(m)}/${z(d)} ${weekday} ${z(h)}:${z(min)}:${z(s)}`
}
