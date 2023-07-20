// 去除字符串头尾空格
export const removeStrSpace = (str: string) => str.replace(/^\s+|\s+$/g, '')

// 格式化JSON字符串
export const formatJSONString = (jsonStr: string):string => {
  try {
    // 将 JSON 字符串转换为 JavaScript 对象
    const obj = JSON.parse(jsonStr)

    // 使用 JSON.stringify() 方法美化 JSON 字符串
    const beautifiedJsonString = JSON.stringify(obj, null, 2)
    return beautifiedJsonString
  } catch (error) {
    console.log('JSON 解析错误:', error)
    return (error as string).toString()
  }
}

