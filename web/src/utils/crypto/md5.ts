import CryptoJS from 'crypto-js'

export const getMd5 = (str: string, type = '32') => {
  // 获取32位MD5哈希值
  const md5_32 = CryptoJS.MD5(str).toString()

  if (type === '32') {
    return md5_32
  } else {
    // 获取16位MD5哈希值
    const md5_16 = md5_32.substr(8, 16)
    return md5_16
  }
}
