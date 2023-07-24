import { useEffect, useState } from 'react'

export const useTime = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState(Date.now())

  useEffect(() => {
    const timeId = setInterval(() => {
      setCurrentTimestamp(Date.now())
    }, 1000)
    return () => clearInterval(timeId)
  }, [])

  return { currentTimestamp }
}
