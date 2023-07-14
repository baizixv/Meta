import CryptoJS from 'crypto-js'

export const getBase64 = (str: string) => {
  try {
    // 加密为Base64
    const encrypted = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(str)
    )
    // 输出Base64加密后的字符串
    return encrypted
  } catch (err) {}
}

export const decodeBase64 = (str: string) => {
  try {
    const decrypted = CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8)
    return decrypted
  } catch (err) {}
}
