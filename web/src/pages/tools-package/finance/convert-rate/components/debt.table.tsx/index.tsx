import React from 'react'
import { Table } from 'antd'
import { columns } from './colums.config.tsx'
import { DebtMonthlyParams } from '@/typings/pages/tools-package/finance'

const DebtTable: React.FC<{ datas: DebtMonthlyParams[]; title: any }> = ({
  datas,
  title,
}) => {
  return (
    <Table
      caption={title}
      columns={columns}
      dataSource={datas}
      bordered
      pagination={false}
    />
  )
}
export default DebtTable
