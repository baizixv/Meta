import React from 'react'
import { Typography, Row, Col, Divider } from 'antd'
import { MoneyCollectOutlined, ProjectOutlined } from '@ant-design/icons'
import {
  rowWrapStyle,
  mainContentStyle,
  verticalDividerStyle,
  blockquoteStyle,
  colStyle,
} from './style.ts'
import { useAction } from './action.ts'
import DebtForm from './components/rate.form/index.tsx'
import { paymentTypeDesc } from '@/configs/router.config/tools-package/finance.config.ts'
import DebtDesc from './components/rate.desc.tsx'
import BlockquoteComp from '@/components/blockquote/index.tsx'
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
  const { debtMoney, debtRate, totalInterest } = debtResult
  return (
    <Row style={rowWrapStyle}>
      {/* 收集数据 */}
      <Row style={mainContentStyle}>
        <Col style={colStyle}>
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
        </Col>
        <Divider type="vertical" dashed style={verticalDividerStyle} />
        <Col style={colStyle}>
          {/* 显示结果 */}
          <Divider orientation="center" orientationMargin={0}>
            <ProjectOutlined /> - 计算结果
          </Divider>
          <BlockquoteComp
            style={blockquoteStyle}
            className="meta-blockquote-rate"
          >
            <DebtDesc
              debtMoney={debtMoney}
              rate={debtRate}
              interestCount={totalInterest}
              debtAccuracy={debtAccuracy ?? 2}
            />
          </BlockquoteComp>
        </Col>
      </Row>
      <Row></Row>
    </Row>
  )
}

export default RateFinance
