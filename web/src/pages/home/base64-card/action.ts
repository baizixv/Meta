import { useState } from 'react'
import { InputValueType } from '@/typings/common'
import { decodeBase64, getBase64 } from '@/utils/crypto/base64'

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
}: {
  inputValue: InputValueType
  changeOutput: (str: string) => void
}) => {
  const handleEncry = () => {
    if (inputValue) {
      const result = getBase64(`${inputValue}`)
      if (typeof result === 'string') {
        changeOutput(result)
      }
    }
  }
  const handleDecry = () => {
    if (inputValue) {
      const result = decodeBase64(`${inputValue}`)
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
