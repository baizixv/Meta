import { readFileAsync, transPath } from './tools/node-func.js'

const existingYears = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']

export const getSpecifiedYearData = async theYear => {
  if (existingYears.includes(theYear)) {
    const thePath = transPath(`../../data/${theYear}.json`)
    // 读取本地JSON文件数据
    const data = await readFileAsync(thePath, 'utf8')
    return data
  } else {
    return
  }
}
