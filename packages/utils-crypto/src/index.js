import crypto from 'crypto'

export const getMd5 = str => {
  const hash = crypto.createHash('md5')
  hash.update(str)
  return hash.digest('hex')
}

export const getBase64 = str => {
  const hash = crypto.createHash('md5')
  hash.update(str)
  return hash.digest('base64')
}

export const base64Decode = str => {
  const base64Reg = /^[A-Za-z0-9+/]*={0,2}$/
  if (!base64Reg.test(str)) {
    throw new Error('Invalid base64 format')
  }
  try {
    return Buffer.from(str, 'base64').toString()
  } catch (error) {
    throw new Error('Decode failed')
  }
}

// base64Decode('5Y+R6L6+')
// console.log(
//   "%c Line:28 🥥 base64Decode('ToTQ2QM/Zsaws8Q91Q2DMA==')",
//   'font-size:18px;color:#ed9ec7;background:#42b983',
//   base64Decode('ToTQ2QM/Zsaws8Q91Q2DMA==')
// )
