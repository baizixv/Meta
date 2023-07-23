// 合并多个style样式
export const mergeStyle = (styles: (Record<string, any> | undefined)[]) => {
  const newStyle: Record<string, any> = {}

  for (let style of styles) {
    if (style) {
      Object.entries(style).forEach(([key, value]) => {
        newStyle[key] = value
      })
    }
  }

  return newStyle
}
