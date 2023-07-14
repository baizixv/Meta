import React from 'react'
import DevtoolsCard from '@/pages/devtools/devtools-card'
import { rgbaToHex, hexToRgba } from '@/utils/calculate/color'
import { InputType } from './devtools-card/action'

const ColorConvertCard: React.FC = () => {
  return (
    <DevtoolsCard
      title="颜色值转换"
      encodeTitle="RGBA转16进制"
      decodeTitle="16进制转RGBA"
      encodePlaceholder="输入区域，RGBA颜色，形如：255,255,255,255"
      decodePlaceholder="输出区域，16进制颜色，形如：#ffffff"
      inputType={InputType.ConvertColorType}
      handleEncode={rgbaToHex}
      handleDecode={hexToRgba}
    />
  )
}

export default ColorConvertCard
