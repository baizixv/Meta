import { DebtMonthlyParams } from '@/typings/pages/tools-package/finance'
import { getLinearMonthlyPayMent } from '@/utils/finance'
import { Form } from 'antd'
import { useState } from 'react'

export const useAction = () => {
  const [form] = Form.useForm()
  const debtPaymentType = Form.useWatch('debtPaymentType', form)
  const computeModel = Form.useWatch('computeModel', form)
  const debtMoney = Form.useWatch('debtMoney', form)
  const debtRate = Form.useWatch('debtRate', form)
  console.log(
    '%c Line:12 🥓 debtRate',
    'font-size:18px;color:#e41a6a;background:#4fff4B',
    debtRate
  )

  const yearRate = debtRate / 100 || 0.34

  const [debtResult, setDebtResult] = useState<{
    debtMonthArray: DebtMonthlyParams[]
    totalInterest: number
  }>({
    debtMonthArray: [],
    totalInterest: 0,
  })

  let totalInterest = 0
  const onFinish = (values: any) => {
    const result = getLinearMonthlyPayMent({
      ...values,
      debtRate: values.debtRate / 100,
    })
    setDebtResult(result)
  }

  const onFinishFailed = (errorInfo: any) => {}

  return {
    form,
    debtPaymentType,
    computeModel,
    yearRate,
    debtResult,
    totalInterest,
    debtMoney,
    onFinish,
    onFinishFailed,
  }
}
