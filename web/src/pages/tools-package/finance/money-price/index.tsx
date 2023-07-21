import React from 'react'
import { Typography, Row, Divider } from 'antd'
import { MoneyCollectOutlined, ProjectOutlined } from '@ant-design/icons'
import { rowWrapStyle } from './style'
import { useAction } from './action'
import DebtForm from './components/debt.form'
import { paymentTypeDesc } from '@/configs/tools-package/finance.config'
import DebtDesc from './components/debt.desc'
import DebtTable from './components/debt.table.tsx'
import './style.css'
const { Paragraph } = Typography

const MoneyPrice: React.FC = () => {
  const { form, debtPaymentType, computeModel, debtResult, onFinish } =
    useAction()

  const { debtMoney, debtRate, debtMonthArray, totalInterest } = debtResult
  return (
    <Row style={rowWrapStyle}>
      {/* 收集数据 */}
      <Divider orientation="center" orientationMargin={0}>
        <MoneyCollectOutlined /> - 输入参数
      </Divider>
      <DebtForm
        computeModel={computeModel}
        formInstance={form}
        onFinish={onFinish}
      />
      <Paragraph>
        <blockquote className="meta-blockquote">
          {paymentTypeDesc[debtPaymentType]}
        </blockquote>
      </Paragraph>
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
          />
        }
        datas={debtMonthArray}
      />
    </Row>
  )
}

export default MoneyPrice
