export interface ToolCardConfig {
  name: string
  iconSrc: string
  path: string
  description: string
  disable?: boolean
}

export interface ToolCardProps extends ToolCardConfig {}
