import React from 'react'
import { fixed2 } from '@/utils/format/number'
import DescList from '@/components/desc-list'
import BlockquoteComp from '@/components/blockquote'
import { descListStyle, textStyle, blockquoteStyle } from './style.ts'
import { Divider } from 'antd'
import './style.css'

const RateDesc: React.FC<{
  irrRate: number
  debtAccuracy: number
  cashFlows?: number[]
  rateCount?: number
}> = ({ cashFlows = [], irrRate = 0, debtAccuracy = 2, rateCount = 0 }) => {
  const captionShows = [
    ['IRR(每期): ', `${fixed2(irrRate * 100, debtAccuracy)}%`],
  ]
  const captionShowsHelp = [
    ['IRR(每年): ', `${fixed2(irrRate * 100 * rateCount, debtAccuracy)}%`],
  ]
  const showCashFlows = cashFlows.map(cash => [``, `${cash}`])
  const showCashFlowsColors = cashFlows.map(cash =>
    cash <= 0 ? 'green' : 'red'
  )

  return (
    <>
      <BlockquoteComp style={blockquoteStyle} className="meta-blockquote-rate">
        <DescList
          descList={
            rateCount > 0
              ? [...captionShows, ...captionShowsHelp]
              : captionShows
          }
        />
      </BlockquoteComp>
      <Divider orientation="center" orientationMargin={0}>
        真实的现金流（从左到右，从上到下）
      </Divider>
      <BlockquoteComp className="meta-blockquote-rate-flows">
        <DescList
          style={descListStyle}
          textStyle={textStyle}
          descList={showCashFlows}
          color={showCashFlowsColors}
        />
      </BlockquoteComp>
      <Divider orientation="center" orientationMargin={0}>
        等效的常规现金流（针对非常规现金流）
      </Divider>
      <BlockquoteComp className="meta-blockquote-rate-flows">
        <DescList
          style={descListStyle}
          textStyle={textStyle}
          descList={showCashFlows}
          color={showCashFlowsColors}
        />
      </BlockquoteComp>
    </>
  )
}
export default RateDesc
