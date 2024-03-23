import React from 'react'
import { Typography } from 'antd'
import { fixed2 } from '@/utils/format/number'

const renderText = (text: number, style: any) => {
  return <Typography.Text style={style}>{`${fixed2(text)}`}</Typography.Text>
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
    title: '每期还款金额',
    dataIndex: 'monthlyPay',
    key: 'monthlyPay',
    align: 'center' as any,
    render: (text: number) => renderText(text, { color: '#e82298' }),
  },
  {
    title: '每期还款拆解',
    children: [
      {
        title: '本金',
        dataIndex: 'monthlyPrincipal',
        key: 'monthlyPrincipal',
        width: 150,
        align: 'center' as any,
        render: (text: number) => renderText(text, { color: '#221373' }),
      },
      {
        title: '利息',
        dataIndex: 'monthlyPayInterest',
        key: 'monthlyPayInterest',
        align: 'center' as any,
        render: (text: number) => renderText(text, { color: '#221373' }),
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
            style={record.isLast ? { color: 'red' } : { color: '#6cd21d' }}
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
            style={record.isLast ? { color: 'red' } : { color: '#6cd21d' }}
          >{`${fixed2(text)}`}</Typography.Text>
        ),
      },
    ],
  },
  {
    title: '剩余应还',
    children: [
      {
        title: '本金',
        dataIndex: 'restPayPrincipal',
        key: 'restPayPrincipal',
        width: 150,
        align: 'center' as any,
        render: (text: number) => renderText(text, { color: '#47445e' }),
      },
      {
        title: '利息',
        dataIndex: 'restPayInterest',
        key: 'restPayInterest',
        align: 'center' as any,
        render: (text: number) => renderText(text, { color: '#47445e' }),
      },
    ],
  },
]
