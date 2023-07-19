export interface ToolCardConfig {
  name: string
  iconSrc: string
  path: string
  description: string
  disable?: boolean
  needShowHome?: boolean
}

export interface ToolCardProps extends ToolCardConfig {}
