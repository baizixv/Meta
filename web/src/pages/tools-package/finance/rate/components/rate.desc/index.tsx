import React from 'react'
import { fixed2 } from '@/utils/format/number'
import DescList from '@/components/desc-list'
import BlockquoteComp from '@/components/blockquote'
import { descListStyle, textStyle, blockquoteStyle } from './style.ts'
import './style.css'
import { Divider } from 'antd'

const RateDesc: React.FC<{
  irrRate: number
  debtAccuracy: number
  cashFlows?: number[]
}> = ({ cashFlows = [], irrRate = 0, debtAccuracy = 2 }) => {
  const captionShows = [
    ['IRR(内部收益率)-每期: ', `${fixed2(irrRate * 100, debtAccuracy)}%`],
  ]

  const showCashFlows = cashFlows.map(cash => [``, `${cash}`])
  const showCashFlowsColors = cashFlows.map(cash =>
    cash <= 0 ? 'green' : 'red'
  )

  return (
    <>
      <BlockquoteComp style={blockquoteStyle} className="meta-blockquote-rate">
        <DescList descList={captionShows} />
      </BlockquoteComp>
      <Divider orientation="center" orientationMargin={0}>
        对应的现金流（从左到右，从上到下）
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
