import React from 'react'
import { Row, Col, Divider } from 'antd'
import { MoneyCollectOutlined, ProjectOutlined } from '@ant-design/icons'
import {
  rowWrapStyle,
  mainContentStyle,
  verticalDividerStyle,
  colStyle,
} from './style.ts'
import { useAction } from './action.ts'
import TimeValueForm from './time-value.form/index.tsx'
import TimeValueResult from './time-value.result/index.tsx'
import './style.css'

const TimeValue: React.FC = () => {
  const { form, rateAccuracy, rateCount, rateResult, onFinish } = useAction()
  const { irrRate, cashFlows } = rateResult

  return (
    <Row style={rowWrapStyle}>
      <Row style={mainContentStyle}>
        {/* 收集数据 */}
        <Col style={colStyle}>
          <Divider orientation="center" orientationMargin={0}>
            <MoneyCollectOutlined /> - 输入参数
          </Divider>
          <TimeValueForm formInstance={form} onFinish={onFinish} />
        </Col>
        <Divider type="vertical" dashed style={verticalDividerStyle} />
        {/* 显示结果 */}
        <Col style={colStyle}>
          <Divider orientation="center" orientationMargin={0}>
            <ProjectOutlined /> - 计算结果
          </Divider>
          <TimeValueResult
            cashFlows={cashFlows}
            irrRate={irrRate}
            debtAccuracy={rateAccuracy}
            rateCount={rateCount}
          />
        </Col>
      </Row>
    </Row>
  )
}

export default TimeValue
