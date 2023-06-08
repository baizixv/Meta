import { Lunar } from 'lunar-typescript'
// 使用第三方库 'lunar-typescript' 处理阴历相关计算， 农历分阴阳历

// 导出函数， 综合处理阴历相关信息进行输出
const getLunarDateInfo = (timestamp: number = Date.now()) => {
  const stdDate = new Date(timestamp)
  const date = Lunar.fromDate(stdDate)
  // 阴历日期表示
  const lunarDate = getLunarDate(date, stdDate)
  // 节气-物候
  const jieQi = getJieQi(date)
  // 查询神煞宜忌
  const [good, bad] = getGoodAndBad(date)
  // 其他阴历信息
  const lunarOtherInfo = getLunarOtherInfo(date)
  return { lunarDate, jieQi, good, bad, lunarOtherInfo }
}

// 查询阴历
const getLunarDate = (date: Lunar, stdDate: Date = new Date()) => {
  let lunarDate = ''
  const currentSolarYear = stdDate.getFullYear()
  if (date.getYear() !== currentSolarYear) {
    // 阳历年份与阴历年份错位
    lunarDate += date.getYearInChinese()
  }
  // 阴历日期
  lunarDate += `${date.getMonthInChinese()}月${date.getDayInChinese()} `
  // 阴历年干支-生肖
  lunarDate += `${date.getYearInGanZhi()}${date.getYearShengXiao()}年 `
  // 获取干支纪月（新的一月以节交接准确时刻起算）
  lunarDate += `${date.getMonthInGanZhiExact()}月 `
  // 获取精确的干支纪日（流派1，晚子时日柱算明天）
  lunarDate += `${date.getDayInGanZhiExact()}日 `

  // 夏天三伏
  const sanFu = date.getFu()
  if (sanFu) {
    lunarDate += ` ${sanFu}`
  }
  // 冬天数九
  const shuJiu = date.getShuJiu()
  if (shuJiu) {
    lunarDate += ` ${shuJiu}`
  }
  return lunarDate
}

// 查询节气-物候-月相
const getJieQi = (date: Lunar) => {
  let jieQiStr = ``
  const jieQi = date.getJieQi()
  if (jieQi) {
    jieQiStr = jieQi
  } else {
    const prevJieQi = date.getPrevJieQi(false)
    const nextJieQi = date.getNextJieQi(false)
    const nextJieQiDate = convertDate(nextJieQi.getSolar().toYmd())

    jieQiStr = `${prevJieQi.getName()}间-${nextJieQi.getName()}前(${nextJieQiDate})`
  }

  // 月相
  const yueXiang = `${date.getYueXiang()}月`
  // 物候
  const wuHou = date.getWuHou()

  return `${jieQiStr} ${yueXiang} ${wuHou} `
}

// 查询神煞宜忌
const getGoodAndBad = (date: Lunar) => {
  const good = date.getDayYi().join('.')
  const bad = date.getDayJi().join('.')
  return [good, bad]
}

// 查询其他阴历信息
const getLunarOtherInfo = (date: Lunar): string => {
  let lunarOtherInfo = ''
  // 七政
  lunarOtherInfo += `${date.getZheng()} `
  // 六曜
  lunarOtherInfo += `${date.getLiuYao()} `
  // 四宫 四神兽
  lunarOtherInfo += `${date.getGong()}${date.getShou()} `
  // 二十八星宿
  lunarOtherInfo += `${date.getXiu()}${date.getAnimal()}${date.getXiuLuck()} `

  // 十二天神
  lunarOtherInfo += `${date.getDayTianShenType()}${date.getDayTianShen()}${date.getDayTianShenLuck()} `

  return lunarOtherInfo
}

// 将形如 '2023-06-06' 转换为 '06-06'
export const convertDate = (str: string): string =>
  str.split('-').slice(1).join('-')

export default getLunarDateInfo
