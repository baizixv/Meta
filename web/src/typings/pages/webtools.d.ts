export interface ToolCardConfig {
  key: string
  name: string
  description: string
  path: string
  iconSrc?: string
  disable?: boolean
  needShowHome?: boolean
}

export interface ToolCardProps extends ToolCardConfig {}
