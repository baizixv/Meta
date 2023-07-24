import initialMenuConfigs from './menu.config'
import { financeListConfigs } from './tools-package/finance.config'
import { webtoolsListConfigs } from './webtools.config'

// 面包屑导航，地址映射
export const getPathNameMap = () => {
  const pathNameMap: Record<string, string> = {
    '/': '主页',
  }

  // 头部导航菜单
  const menuList = [...initialMenuConfigs]

  menuList.forEach(menu => {
    const { key, label } = menu
    if (typeof label === 'string') {
      pathNameMap[key] = label
    }
  })

  // 工具卡片列表
  const cardList = [...webtoolsListConfigs, ...financeListConfigs]

  cardList.forEach(card => {
    const { path, name } = card
    pathNameMap[path] = name
  })

  return pathNameMap
}

export const pathNameMap = getPathNameMap()
