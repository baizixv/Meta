export type InputValueType = string | number | undefined

export enum DevToolsInputType {
  StringType = 'string', // 正常输入sring类型数据
  RandomColorType = 'random-color', // 生成随机颜色时的处理
  ConvertColorType = 'convert-color', // 转换颜色时的处理
}