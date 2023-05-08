/**
 * 颜色相关的操作
 */

// 获取一个随机颜色
// getRandomColor() // '#4c2fd7'
export const getRandomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`

// 将16进制的颜色转换成rgb
// hexToRgb('#00ffff'); // [0, 255, 255]
// hexToRgb('#0ff'); // [0, 255, 255]
export const hexToRgb = hex =>
  hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16))
