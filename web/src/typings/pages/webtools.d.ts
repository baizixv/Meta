export interface ToolCardConfig {
  name: string
  path: string
  description: string
  iconSrc?: string
  disable?: boolean
  needShowHome?: boolean
}

export interface ToolCardProps extends ToolCardConfig {}
