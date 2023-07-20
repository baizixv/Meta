import React from 'react'
import { Typography, Row, Divider, Table } from 'antd'
import { MoneyCollectOutlined, ProjectOutlined } from '@ant-design/icons'
import { rowWrapStyle } from './style'
import { useAction } from './action'
import DebtForm from './components/debt.form'
import { paymentTypeDesc } from '@/configs/tools-package/finance.config'
import './style.css'
const { Paragraph } = Typography

const MoneyPrice: React.FC = () => {
  const { form, debtPaymentType, computeModel, onFinish, onFinishFailed } =
    useAction()
  return (
    <Row style={rowWrapStyle}>
      <Divider orientation="left" orientationMargin={0}>
        <MoneyCollectOutlined />
        -输入参数
      </Divider>
      <DebtForm
        computeModel={computeModel}
        formInstance={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
      <Paragraph>
        <blockquote className="meta-blockquote">
          {paymentTypeDesc[debtPaymentType]}
        </blockquote>
      </Paragraph>
      <Divider orientation="left" orientationMargin={0}>
        <ProjectOutlined />
        -计算结果
      </Divider>
      <Table />
    </Row>
  )
}

export default MoneyPrice
