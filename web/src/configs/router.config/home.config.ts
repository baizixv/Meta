import { ToolCardConfig } from '@/typings/pages/webtools'
import { webtoolsListConfigs } from './webtools.config'
import { financeListConfigs } from './tools-package/finance.config'

export const getHotToollistConfigs = (): ToolCardConfig[] => {
  const result = [...webtoolsListConfigs, ...financeListConfigs].filter(
    config => config.needShowHome
  )
  return result
}
