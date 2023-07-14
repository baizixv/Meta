import React from 'react'
import DevtoolsCard from '@/pages/devtools/devtools-card'
import { InputType } from '@/pages/devtools/devtools-card/action'
import { formatDateTime, formatTimestamp } from '@/utils/format/timer'

const TimestampCard: React.FC = () => {
  return (
    <DevtoolsCard
      title="时间戳转换"
      encodeTitle="时间转换时间戳"
      decodeTitle="时间戳转换时间"
      inputType={InputType.TimestampType}
      handleEncode={formatTimestamp}
      handleDecode={formatDateTime}
    />
  )
}

export default TimestampCard
