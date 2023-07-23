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
import DebtForm from './components/rate.form/index.tsx'
import RateDesc from './components/rate.desc/index.tsx'

const RateFinance: React.FC = () => {
  const { form, onFinish } = useAction()

  return (
    <Row style={rowWrapStyle}>
      <Row style={mainContentStyle}>
        {/* 收集数据 */}
        <Col style={colStyle}>
          <Divider orientation="center" orientationMargin={0}>
            <MoneyCollectOutlined /> - 输入参数
          </Divider>
          <DebtForm formInstance={form} onFinish={onFinish} />
        </Col>
        <Divider type="vertical" dashed style={verticalDividerStyle} />
        {/* 显示结果 */}
        <Col style={colStyle}>
          <Divider orientation="center" orientationMargin={0}>
            <ProjectOutlined /> - 计算结果
          </Divider>
          <RateDesc
            debtMoney={1}
            irrRate={1}
            interestCount={1}
            debtAccuracy={2}
          />
        </Col>
      </Row>
      <Row></Row>
    </Row>
  )
}

export default RateFinance
