import { useState } from 'react'
import { InputValueType } from '@/typings/common'

const useAction = () => {
  const [inputValue, setInputValue] = useState()

  const [outputValue, setOutputValue] = useState('')

  const changeInput = (e: any) => {
    const value = e.target.value
    setInputValue(value)
  }

  const changeOutput = (str: string) => {
    setOutputValue(str)
  }

  return {
    inputValue,
    outputValue,
    changeInput,
    changeOutput,
  }
}

export const useButton = ({
  inputValue,
  changeOutput,
  handleEncode,
  handleDecode,
}: {
  inputValue: InputValueType
  changeOutput: (str: string) => void
  handleEncode: Function
  handleDecode: Function
}) => {
  const handleEncry = () => {
    if (inputValue) {
      const result = handleEncode(`${inputValue}`)
      if (typeof result === 'string') {
        changeOutput(result)
      }
    }
  }
  const handleDecry = () => {
    if (inputValue) {
      const result = handleDecode(`${inputValue}`)
      if (typeof result === 'string') {
        changeOutput(result)
      }
    }
  }

  return {
    handleEncry,
    handleDecry,
  }
}

export default useAction
