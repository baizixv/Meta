import React from 'react'
import { Row, Col, Divider } from 'antd'
import { MoneyCollectOutlined, ProjectOutlined } from '@ant-design/icons'
import {
  rowWrapStyle,
  mainContentStyle,
  verticalDividerStyle,
  colStyle,
  helpContentStyle,
} from './style.ts'
import { useAction } from './action.ts'
import DebtForm from './components/rate.form/index.tsx'
import RateDesc from './components/rate.desc/index.tsx'
import BlockquoteComp from '@/components/blockquote/index.tsx'
import { heloCashFlowsHelpInfos } from '@/configs/router.config/tools-package/finance.config.ts'
import RateHelp from './components/rate.help/index.tsx'
import './style.css'

const RateFinance: React.FC = () => {
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
          <DebtForm formInstance={form} onFinish={onFinish} />
          <Divider orientation="center" orientationMargin={0}>
            辅助现金流输入参数说明
          </Divider>
          <BlockquoteComp className="meta-blockquote-rate-help">
            {heloCashFlowsHelpInfos}
          </BlockquoteComp>
        </Col>
        <Divider type="vertical" dashed style={verticalDividerStyle} />
        {/* 显示结果 */}
        <Col style={colStyle}>
          <Divider orientation="center" orientationMargin={0}>
            <ProjectOutlined /> - 计算结果
          </Divider>
          <RateDesc
            cashFlows={cashFlows}
            irrRate={irrRate}
            debtAccuracy={rateAccuracy}
            rateCount={rateCount}
          />
        </Col>
      </Row>
      <Divider orientation="center" orientationMargin={0}>
        IRR说明
      </Divider>
      <Row style={helpContentStyle}>
        <RateHelp />
      </Row>
    </Row>
  )
}

export default RateFinance
