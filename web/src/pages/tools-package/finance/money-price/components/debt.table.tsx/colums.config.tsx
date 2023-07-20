import React from 'react'
import { Typography } from 'antd'
import { fixed2 } from '@/utils/format/number'

const renderText = (text: number) => {
  return <Typography.Text>{`${fixed2(text)}`}</Typography.Text>
}

export const columns = [
  {
    title: '期数',
    dataIndex: 'termIndex',
    key: 'termIndex',
    align: 'center' as any,
    render: (termIndex: number) => {
      return <Typography.Text>{`第${termIndex + 1}期`}</Typography.Text>
    },
  },
  {
    title: '月供金额',
    dataIndex: 'monthlyPay',
    key: 'monthlyPay',
    align: 'center' as any,
    render: renderText,
  },
  {
    title: '月供拆解',
    children: [
      {
        title: '本金',
        dataIndex: 'monthlyPrincipal',
        key: 'monthlyPrincipal',
        width: 150,
        align: 'center' as any,
        render: renderText,
      },
      {
        title: '利息',
        dataIndex: 'monthlyPayInterest',
        key: 'monthlyPayInterest',
        align: 'center' as any,
        render: renderText,
      },
    ],
  },
  {
    title: '累计还款',
    children: [
      {
        title: '本金',
        dataIndex: 'countPayPrincipal',
        key: 'countPayPrincipal',
        width: 150,
        align: 'center' as any,
        render: (text: number, record: any) => (
          <Typography.Text
            style={record.isLast ? { color: 'red' } : {}}
          >{`${fixed2(text)}`}</Typography.Text>
        ),
      },
      {
        title: '利息',
        dataIndex: 'countPayInterest',
        key: 'countPayInterest',
        align: 'center' as any,
        render: (text: number, record: any) => (
          <Typography.Text
            style={record.isLast ? { color: 'red' } : {}}
          >{`${fixed2(text)}`}</Typography.Text>
        ),
      },
    ],
  },
  {
    title: '剩余月供',
    children: [
      {
        title: '本金',
        dataIndex: 'restPayPrincipal',
        key: 'restPayPrincipal',
        width: 150,
        align: 'center' as any,
        render: renderText,
      },
      {
        title: '利息',
        dataIndex: 'restPayInterest',
        key: 'restPayInterest',
        align: 'center' as any,
        render: renderText,
      },
    ],
  },
]
