// 根据当前时间戳，计算相应的固定颜色
export const getTimeColor = (timestamp: number): string => {
  const seconds = new Date(timestamp).getSeconds()
  const color = `rgb(${seconds * 4}, ${255 - seconds * 4}, 0)`
  return color
}

// 获取16进制随机颜色 
export const getRandomColor = () => {
  const randomNum = Math.floor(Math.random() * 0xffffff)
  let randomColor = '#000000'
  if (randomNum < 2 ** 20) {
    const randomNum10 = Math.floor(Math.random() * 10)
    randomColor = `#0${randomNum10}0000`
  } else {
    randomColor = `#${randomNum.toString(16)}`
  }
  return randomColor
}
  

// RGBA转16进制
export const rgbaToHex = (rgbaString: string = '255,255,255,255') => {
  const rgbaArray = rgbaString.split(/,|，/)
  if (Array.isArray(rgbaArray) && rgbaArray?.length >= 3) {
    const [hexR, hexG, hexB] = rgbaArray.map(itemStr => {
      if (isNaN(Number(itemStr))) {
        return ''
      } else {
        return parseInt(itemStr).toString(16).padStart(2, '0')
      }
    })
    let hexA = ''
    if (rgbaArray[3]) {
      const a = Math.round(parseFloat(rgbaArray[3]) * 255)
      if (!isNaN(a)) {
        hexA = a.toString(16).padStart(2, '0')
      }
    }

    if (hexR && hexG && hexB) {
      return `#${hexR}${hexG}${hexB}${hexA}`
    } else {
      return ''
    }
  }
}
// 16进制转RGBA
export const hexToRgba = (hexString: string) => {
  const regex = /^#([0-9A-Fa-f]{8}|[0-9A-Fa-f]{6})$/
  if (regex.test(hexString)) {
    const hex = hexString.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    let a = '1.00'
    if (hex.length > 6) {
      a = (parseInt(hex.substring(6, 8), 16) / 255).toFixed(2)
    }
    return `${r}, ${g}, ${b}, ${a}`
  }
}
