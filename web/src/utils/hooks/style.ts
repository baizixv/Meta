import { mergeStyle } from '@/tools/style/common'
import { useMemo } from 'react'

// 建立合并style的hooks，缓存合并结果，提高运行效率
export const useStyle = (styles: (Record<string, any> | undefined)[]) => {
  const newStyle = useMemo(() => {
    return mergeStyle(styles)
  }, [styles])

  return newStyle
}
