import { DevToolsInputType } from '../common'

export interface DevtoolsCardConfig {
  title: string
  encodeTitle: string
  decodeTitle: string
  handleEncode: Function
  handleDecode: Function

  encodePlaceholder?: string
  decodePlaceholder?: string
  inputType?: DevToolsInputType
}
