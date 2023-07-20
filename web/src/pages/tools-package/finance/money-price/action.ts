import { PaymentType } from '@/typings/configs/common'
import { DebtResult } from '@/typings/pages/tools-package/finance'
import {
  getAnnuityMonthlyPayment,
  getAnnuityRate,
  getLinearMonthlyPayMent,
  getLinearRate,
} from '@/utils/finance'
import { Form } from 'antd'
import { useState } from 'react'

export const useAction = () => {
  const [form] = Form.useForm()
  const debtPaymentType = Form.useWatch('debtPaymentType', form)
  const computeModel = Form.useWatch('computeModel', form)

  const [debtResult, setDebtResult] = useState<DebtResult>({
    debtMonthArray: [],
    totalInterest: 0,
    debtMoney: 0,
    debtRate: 0,
  })

  let totalInterest = 0
  const onFinish = (values: any) => {
    console.log(
      '%c Line:26 🍯 values',
      'font-size:18px;color:#ea7e5c;background:#b03734',
      values
    )
    let result: DebtResult = {} as DebtResult
    let rate: number = values.debtRate / 100
    if (values.debtPaymentType === PaymentType.Annuity) {
      if (computeModel === 'rate') {
        rate = getAnnuityRate({ ...values })
      }
      console.log(
        '%c Line:36 🍌 rate',
        'font-size:18px;color:#465975;background:#6ec1c2',
        rate
      )

      result = getAnnuityMonthlyPayment({
        ...values,
        debtRate: rate,
      })
    } else {
      if (computeModel === 'rate') {
        rate = getLinearRate(values)
      }
      result = getLinearMonthlyPayMent({
        ...values,
        debtRate: rate,
      })
    }

    setDebtResult(result)
  }

  const onFinishFailed = (errorInfo: any) => {}

  return {
    form,
    debtPaymentType,
    computeModel,
    debtResult,
    totalInterest,
    onFinish,
    onFinishFailed,
  }
}
