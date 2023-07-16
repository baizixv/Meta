import { useState } from 'react'
import { DevToolsInputType, InputValueType } from '@/typings/common'
import { removeStrSpace } from '@/utils/format/common'

const useAction = ({
  inputType = InputType.StringType,
  handleDecode,
}: {
  inputType?: DevToolsInputType
  handleDecode: Function
}) => {
  const [inputValue, setInputValue] = useState(
    inputType === InputType.TimestampType ? handleDecode(Date.now()) : ''
  )

  const [outputValue, setOutputValue] = useState(
    inputType === InputType.TimestampType ? Date.now() : ''
  )

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
    setInputValue,
  }
}

export const useButton = ({
  inputValue,
  inputType,
  changeOutput,
  setInputValue,
  handleEncode,
  handleDecode,
}: {
  inputValue: InputValueType
  inputType: DevToolsInputType
  changeOutput: (str: string) => void
  setInputValue: Function
  handleEncode: Function
  handleDecode: Function
}) => {
  const handleEncry = () => {
    let result = ''
    switch (inputType) {
      case InputType.ConvertColorType:
        result = handleEncode(removeStrSpace(`${inputValue}`))
        if (!result) {
          result = '请输入正确的格式为: 255,255,255 或者 255,255,255,1.0'
        }
        break
      case InputType.RandomColorType:
        result = handleEncode()
        const rgbaColor = `rgba(${handleDecode(result)})`
        setInputValue(rgbaColor)
        break
      case InputType.TimestampType:
        result = handleEncode(removeStrSpace(`${inputValue}`))
        if (!result) {
          result = '请输入正确的格式时间，形如：2023/07/15 11:23:21'
        }
        break
      default:
        if (inputValue) {
          result = `${handleEncode(`${inputValue}`)}`
        }
    }
    changeOutput(result)
  }
  const handleDecry = () => {
    let result = ''
    switch (inputType) {
      case InputType.ConvertColorType:
        result = handleDecode(removeStrSpace(`${inputValue}`))
        if (!result) {
          result = '请输入正确的格式，形如，#f1f2f3 或者 #f1f2f3f4'
        }
        break
      case InputType.RandomColorType:
        result = handleDecode()
        break
      case InputType.TimestampType:
        result = handleDecode(removeStrSpace(`${inputValue}`))
        if (!result) {
          result = '请输入正确的格式时间戳，13位长度的数字'
        }
        break
      default:
        if (inputValue) {
          result = handleDecode(`${inputValue}`)
        }
    }

    if (typeof result === 'string') {
      changeOutput(result)
    }
  }

  const getRandomButtonColor = () => {
    return inputType === InputType.RandomColorType &&
      inputValue &&
      typeof inputValue === 'string'
      ? inputValue
      : '#1e9fff'
  }

  return {
    handleEncry,
    handleDecry,
    getRandomButtonColor,
  }
}

export const InputType = {
  StringType: 'string' as DevToolsInputType,
  RandomColorType: 'random-color' as DevToolsInputType,
  ConvertColorType: 'convert-color' as DevToolsInputType,
  TimestampType: 'convert-timestamp' as DevToolsInputType,
}

export default useAction
