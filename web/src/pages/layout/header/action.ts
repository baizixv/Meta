import { useState } from 'react'
import { useNavigate, useLocation } from '@/utils/hooks/router'

const useAction = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const initialCurrentLabel = pathname === '/' ? '/home' : pathname
  const [currentLabel, setcurrentLabel] = useState(initialCurrentLabel)
  const onClick = (e: any) => {
    const path = e.key || '/'

    setcurrentLabel((prevPath: string) => {
      let result = path
      if (path === '/github') {
        result = prevPath
      }
      navigate(result)
      return result
    })
  }

  return {
    navigate,
    currentLabel,
    onClick,
  }
}

export default useAction
