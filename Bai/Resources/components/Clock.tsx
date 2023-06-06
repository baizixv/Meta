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
  const [time, setTime] = useState('')
  const getTime = () => {
    const timeId = setInterval(() => {
      setCurrentTime(Date.now())
      const result = formatData(currentTime)
      setTime(result)
      clearInterval(timeId)
    }, 1000)
  }
  useEffect(() => {
    getTime()
  }, [time])

  return <span>{time}</span>
}

export default Clock
