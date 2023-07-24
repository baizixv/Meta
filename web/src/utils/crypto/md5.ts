import CryptoJS from 'crypto-js'

export const getMd5 = (str: string) => {
  // 获取32位MD5哈希值
  const md5_32 = CryptoJS.MD5(str).toString()
  return md5_32
}

export const getMd5_16 = (str: string) => {
  // 获取32位MD5哈希值
  const md5_32 = CryptoJS.MD5(str).toString()

  // 获取16位MD5哈希值
  const md5_16 = md5_32.substr(8, 16)
  return md5_16
}
