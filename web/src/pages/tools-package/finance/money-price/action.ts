import { useState } from 'react'
import { Form } from 'antd'
import {
  getLinearMonthlyPayMent,
  getLinearRate,
  getAnnuityRate,
  getAnnuityMonthPayArray,
} from '@/utils/finance'
import { PaymentType } from '@/typings/configs/common'
import {
  DebtParamsFirst,
  DebtResult,
} from '@/typings/pages/tools-package/finance'

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

  const onFinish = (values: any) => {
    let result: DebtResult = {} as DebtResult
    let rate: number = values.debtRate / 100

    switch (values.debtPaymentType) {
      case PaymentType.Annuity: // 等额本息
        if (computeModel === 'rate') {
          rate = getAnnuityRate({ ...values })
        }
        result = getAnnuityMonthlyPayment({
          ...values,
          debtRate: rate,
        })
        break
      case PaymentType.Linear: // 等额本金
      default:
        if (computeModel === 'rate') {
          rate = getLinearRate(values)
        }
        result = getLinearMonthlyPayMent({
          ...values,
          debtRate: rate,
        })
        break
    }

    setDebtResult(result)
  }

  return {
    form,
    debtPaymentType,
    computeModel,
    debtResult,
    onFinish,
  }
}

// 获取等额本息月供账单
const getAnnuityMonthlyPayment = ({
  debtMoney,
  debtRate,
  debtTerm,
}: DebtParamsFirst) => {
  const debtMonthArray = getAnnuityMonthPayArray({
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
