import { PaymentType } from '@/typings/configs/common'
import { DebtResult } from '@/typings/pages/tools-package/finance'
import {
  getAnnuityMonthlyPayment,
  getLinearMonthlyPayMent,
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
    let result: DebtResult = {} as DebtResult
    if (values.debtPaymentType === PaymentType.Annuity) {
      result = getAnnuityMonthlyPayment({
        ...values,
        debtRate: values.debtRate / 100,
      })
    } else {
      result = getLinearMonthlyPayMent({
        ...values,
        debtRate: values.debtRate / 100,
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
