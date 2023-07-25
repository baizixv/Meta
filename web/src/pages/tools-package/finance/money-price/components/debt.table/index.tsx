import React from 'react'
import { Table } from 'antd'
import { columns } from './colums.config.tsx'
import { DebtResult } from '@/typings/pages/tools-package/finance/money-price.js'
import { fixed2 } from '@/utils/format/number.ts'
import DescList from '@/components/desc-list/index.tsx'
import { useAction } from './action.ts'

const DebtTable: React.FC<{
  debtResult: DebtResult
  debtAccuracy: number
}> = ({ debtResult, debtAccuracy }) => {
  const { debtTermArray } = debtResult

  const { captionShows } = useAction(debtResult, debtAccuracy)

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
