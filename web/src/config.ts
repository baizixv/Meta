// 提供模板文件，可复制到本地同目录下config.local.ts中作为本地可更改的配置文件
// 开发子模式 - 快速开发模式，用于业务开发中快速切换
export const isNeedDevModelQuick = true

// 引入临时测试函数
try {
  // 处理配置模块文件可能不存在的情况，不影响正常业务逻辑，文件不存在会取默认配置
  require('./test.temp.ts')
} catch (error) {
  console.log(error)
}
