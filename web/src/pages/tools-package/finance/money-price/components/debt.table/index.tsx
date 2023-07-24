import React from 'react'
import { Table } from 'antd'
import { columns } from './colums.config.tsx'
import { DebtMonthlyParams } from '@/typings/pages/tools-package/finance/money-price.js'
import { fixed2 } from '@/utils/format/number.ts'
import DescList from '@/components/desc-list/index.tsx'

const DebtTable: React.FC<{
  datas: DebtMonthlyParams[]
  debtRate: number
  totalInterest: number
  debtMoney: number
  debtAccuracy: number
  debtIrrRate?: number
}> = ({
  datas,
  debtRate,
  totalInterest,
  debtMoney,
  debtAccuracy,
  debtIrrRate = 0,
}) => {
  const captionShows = [
    ['年利率：', `${fixed2(debtRate * 100, debtAccuracy)}%`],
    ['IRR-每期：', `${fixed2(debtIrrRate * 100, debtAccuracy)}%`],
    ['IRR-每年：', `${fixed2(debtIrrRate * 100 * 12, debtAccuracy)}%`],
    ['利息总额：', `${fixed2(totalInterest)}元`],
    ['还款总额：', `${fixed2(+debtMoney + +totalInterest)}元`],
  ]
  return (
    <Table
      caption={<DescList descList={captionShows} />}
      columns={columns}
      dataSource={datas}
      bordered
      pagination={false}
    />
  )
}
export default DebtTable
