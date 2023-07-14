import React from 'react'
import DevtoolsCard from '@/components/card/devtools-card'
import { getBase64, decodeBase64 } from '@/utils/crypto/base64'

const Base64Card: React.FC = () => {
  return (
    <DevtoolsCard
      title="BASE64加密"
      encodeTitle="Base64加密"
      decodeTitle="Base64解密"
      handleEncode={getBase64}
      handleDecode={decodeBase64}
    />
  )
}

export default Base64Card
