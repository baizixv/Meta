import React from 'react'
import BlockquoteComp from '@/components/blockquote'
import { rateHelpInfos } from '@/configs/router.config/tools-package/finance.config.ts'
import './style.css'

const RateHelp: React.FC = () => {
  return (
    <BlockquoteComp
      style={{ width: '100%' }}
      className="meta-blockquote-rate-help"
    >
      {rateHelpInfos}
    </BlockquoteComp>
  )
}
export default RateHelp
