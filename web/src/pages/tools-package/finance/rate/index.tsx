import React from 'react'
import { Typography, Row, Divider, Space } from 'antd'
import { MoneyCollectOutlined, ProjectOutlined } from '@ant-design/icons'
import { rowWrapStyle, rowItemStyle, spaceMainWrapStyle } from './style.ts'
import { useAction } from './action.ts'
import DebtForm from './components/rate.form/index.tsx'
import { paymentTypeDesc } from '@/configs/router.config/tools-package/finance.config.ts'
import DebtDesc from './components/rate.desc.tsx'
import DebtTable from './components/rate.table.tsx/index.tsx'
import './style.css'
const { Paragraph } = Typography

const RateFinance: React.FC = () => {
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
      <Space style={spaceMainWrapStyle}>
        <Row style={rowItemStyle}>
          <Divider orientation="center" orientationMargin={0}>
            <MoneyCollectOutlined /> - 输入参数
          </Divider>
          <DebtForm
            computeModel={computeModel}
            debtAccuracy={debtAccuracy ?? 2}
            formInstance={form}
            onFinish={onFinish}
          />
          <Paragraph>
            <blockquote className="meta-blockquote">
              {paymentTypeDesc[debtPaymentType]}
            </blockquote>
          </Paragraph>
        </Row>
        <Row>
          {/* 显示结果 */}
          <Divider orientation="center" orientationMargin={0}>
            <ProjectOutlined /> - 计算结果
          </Divider>
          <Paragraph>
            <blockquote className="meta-blockquote">
              {paymentTypeDesc[debtPaymentType]}
            </blockquote>
          </Paragraph>
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
      </Space>
      <Space></Space>
    </Row>
  )
}

export default RateFinance
