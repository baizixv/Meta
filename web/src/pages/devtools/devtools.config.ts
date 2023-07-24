import { DevtoolsCardConfig } from '@/typings/pages/devtools'
import { getRandomColor, hexToRgba, rgbaToHex } from '@/utils/calculate/color'
import { decodeBase64, getBase64 } from '@/utils/crypto/base64'
import { getMd5, getMd5_16 } from '@/utils/crypto/md5'
import { InputType } from './devtools-card/action'
import { formatDateTime, formatTimestamp } from '@/utils/format/timer'

export const devtoolsConfigs: DevtoolsCardConfig[] = [
  {
    title: '时间戳转换',
    encodeTitle: '时间转换时间戳',
    decodeTitle: '时间戳转换时间',
    inputType: InputType.TimestampType,
    handleEncode: formatTimestamp,
    handleDecode: formatDateTime,
  },
  {
    title: 'BASE64加密',
    encodeTitle: 'Base64加密',
    decodeTitle: 'Base64解密',
    handleEncode: getBase64,
    handleDecode: decodeBase64,
  },
  {
    title: 'MD5加密',
    encodeTitle: '16位加密',
    decodeTitle: '32位加密',
    encodePlaceholder: '请输入被加密的内容',
    decodePlaceholder: '在这里会生成MD5加密值',
    handleEncode: getMd5_16,
    handleDecode: getMd5,
  },
  {
    title: '颜色值转换',
    encodeTitle: 'RGBA转16进制',
    decodeTitle: '16进制转RGBA',
    encodePlaceholder: '输入区域，RGBA颜色，形如：255,255,255,255',
    decodePlaceholder: '输出区域，16进制颜色，形如：#ffffff',
    inputType: InputType.ConvertColorType,
    handleEncode: rgbaToHex,
    handleDecode: hexToRgba,
  },
  {
    title: '随机颜色生成',
    encodeTitle: '颜色生成',
    decodeTitle: '颜色色块',
    encodePlaceholder: '显示RGBA色值，形如：rgba(255,255,255,1.0)',
    decodePlaceholder: '显示16进制色值，形如：#f1f2f3f4',
    inputType: InputType.RandomColorType,
    handleEncode: getRandomColor,
    handleDecode: hexToRgba,
  },
]
