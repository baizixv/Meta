import { downloadQRCode } from '@/utils/common/dowload'
import { useInput } from '@/utils/hooks/input'
import { message } from 'antd'
import React from 'react'

export const useAction = () => {
  const [qrcodeText, setQRcodeText] = React.useState('-')
  const [input, changeInput] = useInput()

  const handleBuildQRcode = () => {
    const str = `${input || '-'}`
    if (str.length > 500) {
      message.error('内容过长, 无法生成，限制字符500字')
    } else {
      setQRcodeText(str)
    }
  }

  const handleDownloadQRCode = () => {
    downloadQRCode('myQRCode')
  }

  return {
    input,
    changeInput,
    qrcodeText,
    handleBuildQRcode,
    handleDownloadQRCode,
  }
}
