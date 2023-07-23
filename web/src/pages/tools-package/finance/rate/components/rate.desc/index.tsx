import React from 'react'
import { fixed2 } from '@/utils/format/number'
import DescList from '@/components/desc-list'
import BlockquoteComp from '@/components/blockquote'
import { blockquoteStyle } from './style.ts'
import './style.css'

const RateDesc: React.FC<{
  irrRate: number
  debtAccuracy: number
}> = ({ irrRate = 0, debtAccuracy = 2 }) => {
  const captionShows = [
    ['IRR(内部收益率)-每期: ', `${fixed2(irrRate * 100, debtAccuracy)}%`],
  ]
  return (
    <BlockquoteComp style={blockquoteStyle} className="meta-blockquote-rate">
      <DescList descList={captionShows} />
    </BlockquoteComp>
  )
}
export default RateDesc
