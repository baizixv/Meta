import React from 'react'
import DevtoolsCard from '@/components/card/devtools-card'
import { getMd5, getMd5_16 } from '@/utils/crypto/md5'

const MD5Card = () => {
  return (
    <DevtoolsCard
      title="MD5加密"
      encodeTitle="16位加密"
      decodeTitle="32位加密"
      encodePlaceholder="请输入被加密的内容"
      decodePlaceholder="在这里会生成MD5加密值"
      handleEncode={getMd5_16}
      handleDecode={getMd5}
    />
  )
}

export default MD5Card
