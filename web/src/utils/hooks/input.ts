import { useState } from 'react'

export const useInput = (
  initialInput: string | number = ''
): [string | number, (e: any) => void, (str: string | number) => void] => {
  const [input, setInput] = useState(initialInput)
  const changeInput = (e: any) => {
    const value: string | number = e.target.value
    setInput(value)
  }

  return [input, changeInput, setInput]
}
