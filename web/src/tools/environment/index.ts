let configLocal = { isNeedDevModelQuick: false }

const path = './config.ts'

import(path)
  .then(resolve => {
    const { fileModule } = resolve
    configLocal = fileModule
  })
  .catch(err => console.log(err))

const { isNeedDevModelQuick = false } = configLocal
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
