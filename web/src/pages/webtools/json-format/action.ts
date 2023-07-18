import { formatJSONString } from '@/utils/format/common'
import { useRef, useState, useEffect } from 'react'

export const useAction = (hljs: any) => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleInput = (e: any) => {
    const inputValue = e.target.value
    const resultOut = formatJSONString(`${inputValue}`)

    setInput(inputValue)
    setOutput(resultOut)
  }

  const codeRef = useRef(null)
  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current)
    }
  }, [hljs])

  return {
    input,
    output,
    codeRef,
    handleInput,
  }
}
