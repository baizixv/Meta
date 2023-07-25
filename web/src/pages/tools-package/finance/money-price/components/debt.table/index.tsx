import React from 'react'
import { Table } from 'antd'
import { columns } from './colums.config.tsx'
import { DebtResult } from '@/typings/pages/tools-package/finance/money-price.js'
import { fixed2 } from '@/utils/format/number.ts'
import DescList from '@/components/desc-list/index.tsx'

const DebtTable: React.FC<{
  debtResult: DebtResult
  debtAccuracy: number
}> = ({ debtResult, debtAccuracy }) => {
  const {
    debtMoney,
    debtRate,
    debtIrrRate = 0,
    debtTermArray,
    totalInterest,
    debtCycleUnitRatio = 1,
  } = debtResult

  const captionShows = [
    ['IRR-每期：', `${fixed2(debtIrrRate * 100, debtAccuracy)}%`],
    ['利息总额：', `${fixed2(totalInterest)}元`],
    ['还款总额：', `${fixed2(+debtMoney + +totalInterest)}元`],
  ]

  if (debtCycleUnitRatio > 0) {
    captionShows.unshift(
      [
        '年百分率(APR):',
        `${fixed2(debtRate * debtCycleUnitRatio * 100, debtAccuracy)}%`,
      ],
      [
        'IRR-每年：',
        `${fixed2(debtIrrRate * debtCycleUnitRatio * 100, debtAccuracy)}%`,
      ]
    )
  }

  return (
    <Table
      caption={<DescList descList={captionShows} />}
      columns={columns}
      dataSource={debtTermArray}
      bordered
      pagination={false}
    />
  )
}
export default DebtTable
