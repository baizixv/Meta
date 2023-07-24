// 下载二维码原生web实现
export const downloadQRCode = (
  id: string,
  name = `QRCode${Date.now()}.png`
) => {
  const canvas = document
    .getElementById(id)
    ?.querySelector<HTMLCanvasElement>('canvas')
  if (canvas) {
    const url = canvas.toDataURL()
    const a = document.createElement('a')
    a.download = name
    a.href = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
