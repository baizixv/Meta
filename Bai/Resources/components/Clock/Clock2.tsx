import React, { useState, useEffect } from 'react'

const Clock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const seconds = time.getSeconds()
  const color = `rgb(${seconds * 4}, ${255 - seconds * 4}, 0)`

  return (
    <span style={{ borderBottom: `3px solid ${color}` }}>
      {time.toLocaleTimeString()}
    </span>
  )
}

export default Clock
