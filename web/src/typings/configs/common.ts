// 开发者工具，工具类型
export const enum DevToolsInputType {
  StringType = 'string', // 正常输入sring类型数据
  RandomColorType = 'random-color', // 生成随机颜色时的处理
  ConvertColorType = 'convert-color', // 转换颜色时的处理
}

// 财务计算工具，借贷利率计算，还款方式
export const enum PaymentTypeEnum {
  Annuity = 'Annuity', // 等额本息
  Linear = 'Linear', // 等额本金
}

// 财务计算工具,借款显示利率类型
export const enum APRTypeEnum {
  Year = "year",
  Month = "month",
  Day = "day",
  Term = "term"
}

export const APRTypeEnumRateMap  = {
  [APRTypeEnum.Year]: "年利率",
  [APRTypeEnum.Month]: "月利率",
  [APRTypeEnum.Day]: "日利率",
  [APRTypeEnum.Term]: "期利率",
}
