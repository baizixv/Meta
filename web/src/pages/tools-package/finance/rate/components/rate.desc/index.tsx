import React from 'react'
import { fixed2 } from '@/utils/format/number'
import DescList from '@/components/desc-list'
import BlockquoteComp from '@/components/blockquote'
import { blockquoteStyle } from './style.ts'
import './style.css'

const RateDesc: React.FC<{
  irrRate: number
  interestCount: number
  debtMoney: number
  debtAccuracy: number
}> = ({ irrRate, interestCount, debtMoney, debtAccuracy }) => {
  const captionShows = [
    ['IRR(内部收益率)：', `${fixed2(irrRate * 100, debtAccuracy)}%`],
    ['还款总额：', `${fixed2(+debtMoney + +interestCount)}元`],
    ['利息总额：', `${fixed2(interestCount)}元`],
  ]
  return (
    <BlockquoteComp style={blockquoteStyle} className="meta-blockquote-rate">
      <DescList descList={captionShows} />
    </BlockquoteComp>
  )
}
export default RateDesc
