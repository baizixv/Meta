import { ToolCardConfig } from '@/typings/pages/webtools'
import { webtoolsListConfigs } from './webtools.config'

export const getHotToollistConfigs = (): ToolCardConfig[] => {
  const result = webtoolsListConfigs.filter(config => config.needShowHome)
  return result
}
