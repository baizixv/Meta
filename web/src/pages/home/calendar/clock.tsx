import React, { useState, useEffect } from 'react'
import { getTimeColor } from '@/utils/calculate/color'
import { formatData } from '@/utils/format/timer'

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const timeId = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(timeId)
  }, [])

  const time = formatData(currentTime)
  const color = getTimeColor(currentTime)

  return <span style={{ borderBottom: `3px solid ${color}` }}>{time}</span>
}

export default Clock
