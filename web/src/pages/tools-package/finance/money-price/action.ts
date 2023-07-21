import { useState } from 'react'
import { Form } from 'antd'
import {
  getLinearRate,
  getAnnuityRate,
  getAnnuityMonthPayArray,
  getLinearMonthPayArray,
} from '@/utils/finance'
import { PaymentTypeEnum } from '@/typings/configs/common'
import {
  DebtParamsFirst,
  DebtResult,
} from '@/typings/pages/tools-package/finance'

export const useAction = () => {
  const [form] = Form.useForm()
  const debtPaymentType: PaymentTypeEnum = Form.useWatch(
    'debtPaymentType',
    form
  )
  const computeModel = Form.useWatch('computeModel', form)

  const [debtResult, setDebtResult] = useState<DebtResult>({
    debtMonthArray: [],
    totalInterest: 0,
    debtMoney: 0,
    debtRate: 0,
  })

  const onFinish = (values: any) => {
    console.log(
      '%c Line:31 🍇 values',
      'font-size:18px;color:#b03734;background:#fca650',
      values
    )
    let result: DebtResult = {} as DebtResult
    let rate: number = values.debtRate

    switch (values.debtPaymentType) {
      case PaymentTypeEnum.Annuity: // 等额本息
        if (computeModel === 'rate') {
          rate = getAnnuityRate({ ...values })
        }
        result = getMonthlyPayment({
          ...values,
          debtRate: rate,
        })
        break
      case PaymentTypeEnum.Linear: // 等额本金
      default:
        if (computeModel === 'rate') {
          rate = getLinearRate(values)
        }
        result = getMonthlyPayment({
          ...values,
          debtRate: rate,
        })
        break
    }

    setDebtResult(result)
    console.log(
      '%c Line:62 🧀 result',
      'font-size:18px;color:#6ec1c2;background:#6ec1c2',
      result
    )
  }

  return {
    form,
    debtPaymentType,
    computeModel,
    debtResult,
    onFinish,
  }
}

// 获取每期还款账单
const getMonthlyPayment = ({
  debtMoney,
  debtRate,
  debtTerm,
  debtPaymentType,
}: DebtParamsFirst &
  Record<'debtPaymentType', PaymentTypeEnum>): DebtResult => {
  let debtMonthArray =
    debtPaymentType === PaymentTypeEnum.Linear
      ? getLinearMonthPayArray({
          debtMoney,
          debtRate,
          debtTerm,
        })
      : getAnnuityMonthPayArray({
          debtMoney,
          debtRate,
          debtTerm,
        })

  const lastMonthItem = debtMonthArray[debtMonthArray.length - 1]
  const { countPayInterest: totalInterest } = lastMonthItem

  return {
    debtMoney, // 借款本金
    debtRate, // 年利率
    totalInterest, // 利息总额
    debtMonthArray, // 月供账单
  }
}
