import React from 'react'
import ToolList from '@/components/tool-list'
import { financeListConfigs } from '@/configs/tools-package/finance.config'

const FinanceListPage: React.FC = () => {
  return <ToolList toolListConfigs={financeListConfigs} />
}

export default FinanceListPage
