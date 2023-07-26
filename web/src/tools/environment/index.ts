let isNeedDevModelQuick = false

try {
  // 处理配置模块文件可能不存在的情况，不影响正常业务逻辑，文件不存在会取默认配置
  const fileModule = require('../../config.local.ts')
  isNeedDevModelQuick = fileModule.isNeedDevModelQuick || false
} catch (error) {
  console.log(error)
}
// 开发环境
export const isDev = process.env.NODE_ENV === 'development'

// 生产环境
export const isProduction = process.env.NODE_ENV === 'production'

// 测试环境
export const isTest = process.env.NODE_ENV === 'test'

//  开发子模式-快速开发模式
export const isDevModelQuick =
  isNeedDevModelQuick &&
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_DEV_MODEL === 'quick'

//  开发子模式-严格开发模式
export const isDevModelStrict =
  !isNeedDevModelQuick &&
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_DEV_MODEL === 'strict'
