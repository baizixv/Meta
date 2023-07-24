import React, { useState, useEffect } from 'react'

const formatData = (timeStr: number): string => {
  const newStr = new Date(timeStr)
  const y = newStr.getFullYear()
  const m = newStr.getMonth() + 1
  const d = newStr.getDate()
  const h = newStr.getHours()
  const min = newStr.getMinutes()
  const s = newStr.getSeconds()
  const z = (n: number): string => (n < 10 ? `0${n}` : `${n}`)
  return `${y}/${z(m)}/${z(d)} ${z(h)}:${z(min)}:${z(s)}`
}

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const timeId = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(timeId)
  }, [])

  const time = formatData(currentTime)
  const seconds = new Date(time).getSeconds()
  const color = `rgb(${seconds * 4}, ${255 - seconds * 4}, 0)`

  return <span style={{ borderBottom: `3px solid ${color}` }}>{time}</span>
}

export default Clock
