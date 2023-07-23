import React from 'react'
import { Row, Divider } from 'antd'
import { MoneyCollectOutlined, ProjectOutlined } from '@ant-design/icons'
import { rowWrapStyle } from './style'
import { useAction } from './action'
import DebtForm from './components/debt.form'
import { paymentTypeDesc } from '@/configs/router.config/tools-package/finance.config.ts'
import DebtDesc from './components/debt.desc'
import DebtTable from './components/debt.table.tsx'
import BlockquoteComp from '@/components/blockquote/index.tsx'

const MoneyPrice: React.FC = () => {
  const {
    form,
    debtPaymentType,
    computeModel,
    debtAccuracy,

    debtResult,
    onFinish,
  } = useAction()
  const { debtMoney, debtRate, debtMonthArray, totalInterest } = debtResult
  return (
    <Row style={rowWrapStyle}>
      {/* 收集数据 */}
      <Divider orientation="center" orientationMargin={0}>
        <MoneyCollectOutlined /> - 输入参数
      </Divider>
      <DebtForm
        computeModel={computeModel}
        debtAccuracy={debtAccuracy ?? 2}
        formInstance={form}
        onFinish={onFinish}
      />
      <BlockquoteComp blockquoteDesc={paymentTypeDesc[debtPaymentType]} />
      {/* 显示结果 */}
      <Divider orientation="center" orientationMargin={0}>
        <ProjectOutlined /> - 计算结果
      </Divider>
      <DebtTable
        title={
          <DebtDesc
            debtMoney={debtMoney}
            rate={debtRate}
            interestCount={totalInterest}
            debtAccuracy={debtAccuracy ?? 2}
          />
        }
        datas={debtMonthArray}
      />
    </Row>
  )
}

export default MoneyPrice
