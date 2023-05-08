/**
 * web 相关操作
 */

// 重新加载当前页面
export const reload = () => location.reload()

// 将页面翻到最顶部
export const goToTop = () => window.scrollTo(0, 0)

// 将一个元素顺滑的滚动到可视区域的起点
// scrollToTop(document.body)
export const scrollToTop = element => element.scrollIntoView({ behavior: 'smooth', block: 'start' })

// 将一个元素顺滑的滚动到可视区域的终点
// scrollToBottom(document.body)
export const scrollToBottom = element =>
  element.scrollIntoView({ behavior: 'smooth', block: 'end' })

// 检查当前是否IE浏览器
export const isIE = () => !!document?.documentMode

// 在某个文本中将里面的标签全部过滤掉
// stripHtml('<div>test</div>')
// 'test'
export const stripHtml = html =>
  new DOMParser().parseFromString(html, 'text/html').body.textContent || ''

// 跳转到其他页面，重定向
export const goTo = url => (location.href = url)

// 复制文本到粘贴板上
// copy('你需要粘贴的文本')
export const copyText = text =>
  navigator.clipboard?.writeText && navigator.clipboard.writeText(text)
