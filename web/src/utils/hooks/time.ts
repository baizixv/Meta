import { useEffect, useState } from 'react'

export const useTime = () => {
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const timeId = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(timeId)
  }, [])

  return { currentTime }
}
