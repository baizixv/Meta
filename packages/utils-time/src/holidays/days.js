import { getSpecifiedYearData } from './fetch-data.js'

const year = '2023'

const theYearData = await getSpecifiedYearData(year)

console.log(
  '%c Line:6 🥐 theYearData',
  'font-size:18px;color:#6ec1c2;background:#e41a6a',
  theYearData
)

const isHoliday = () => {}
// isWorkDay()
// isWeekEnd()
// getDateInfo()
