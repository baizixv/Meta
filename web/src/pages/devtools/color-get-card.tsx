import React from 'react'
import DevtoolsCard from '@/pages/devtools/devtools-card'
import { getRandomColor } from '@/utils/calculate/color'
import { InputType } from '@/pages/devtools/devtools-card/action'

const ColorGetCard: React.FC = () => {
  return (
    <DevtoolsCard
      title="随机颜色生成"
      encodeTitle="颜色生成"
      decodeTitle="颜色示例"
      encodePlaceholder="显示RGBA色值，形如：255,255,255,1.0"
      decodePlaceholder="显示16进制色值，形如：#f1f2f3f4"
      inputType={InputType.RandomColorType}
      handleEncode={getRandomColor}
      handleDecode={() => {}}
    />
  )
}

export default ColorGetCard
