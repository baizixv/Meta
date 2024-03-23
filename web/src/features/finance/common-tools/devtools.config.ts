import { DevtoolsCardConfig } from '@/typings/pages/devtools'
import { getRandomColor, hexToRgba, rgbaToHex } from '@/utils/calculate/color'
import { decodeBase64, getBase64 } from '@/utils/crypto/base64'
import { getMd5, getMd5_16 } from '@/utils/crypto/md5'
import { InputType } from './devtools-card/action'
import { formatDateTime, formatTimestamp } from '@/utils/format/timer'

export const devtoolsConfigs: DevtoolsCardConfig[] = [
  {
    title: 'APR转换EAR',
    encodeTitle: 'APR转换EAR',
    decodeTitle: 'EAR转换APR',
    inputType: InputType.TimestampType,
    handleEncode: formatTimestamp,
    handleDecode: formatDateTime,
  },
]
