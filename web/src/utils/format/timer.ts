import { getWeekDay } from '../calculate/date/date'
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
export const formatTimeData = (timestamp: number): string => {
  const [y, m, d, h, min, s] = getDate(timestamp)

  const weekday = getWeekDay(timestamp)

  return `${y}/${z(m)}/${z(d)} ${weekday} ${z(h)}:${z(min)}:${z(s)}`
}

// 格式化时间，形如 "2023-06-06",连接符号可以指定
export const formatDate = (
  timestamp: number,
  connectStr: string = '-'
): string => {
  const [y, m, d] = getDate(timestamp)
  return `${y}${connectStr}${z(m)}${connectStr}${z(d)}`
}

// 格式化时间，形如 "2023/07/15 01:08:53",连接符号可以指定
export const formatDateTime = (
  timestamp: number,
  connectStr: string = '/'
): string => {
  if (!isNaN(Number(timestamp))) {
    const [y, m, d, h, min, s] = getDate(+timestamp)
    return `${y}${connectStr}${z(m)}${connectStr}${z(d)} ${z(h)}:${z(min)}:${z(s)}`
  } else {
    return ''
  }
}

// 根据日期时间，得到时间戳
export const formatTimestamp = (dateTime:string) => {
  const regex = /^[1-9]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/
  if (regex.test(dateTime)) {
    return new Date(dateTime).getTime()
  } else {
    return ''
  }
}
