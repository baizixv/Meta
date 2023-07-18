import { formatJSONString } from '@/utils/format/common'
import { useState } from 'react'

export const useAction = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleInput = (e: any) => {
    const inputValue = e.target.value
    setInput(inputValue)
    const resultOut = formatJSONString(`${inputValue}`)
    setOutput(resultOut)
  }

  return {
    input,
    output,
    handleInput,
  }
}
