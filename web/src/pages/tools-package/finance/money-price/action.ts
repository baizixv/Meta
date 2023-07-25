import { useCallback, useState } from 'react'
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
} from '@/typings/pages/tools-package/finance/money-price'
import { calculateIRR } from '@/utils/finance/IRR'

export const useAction = () => {
  const [form] = Form.useForm()
  const debtPaymentType: PaymentTypeEnum = Form.useWatch(
    'debtPaymentType',
    form
  )
  const computeModel = Form.useWatch('computeModel', form)
  const debtAccuracy = Form.useWatch('debtAccuracy', form)

  const [debtResult, setDebtResult] = useState<DebtResult>({
    debtTermArray: [],
    totalInterest: 0,
    debtMoney: 0,
    debtRate: 0,
  })

  const onFinishRaw = (formValues: any) => {
    console.log(
      '%c Line:33 🍉 formValues',
      'font-size:18px;color:#7f2b82;background:#33a5ff',
      formValues
    )
    let result: DebtResult = {} as DebtResult
    let { debtRate: rate, debtPaymentType } = formValues

    switch (debtPaymentType) {
      case PaymentTypeEnum.Annuity: // 等额本息
        if (computeModel === 'rate') {
          rate = getAnnuityRate(formValues)
        }
        result = getMonthlyPayment({
          ...formValues,
          debtRate: rate,
        })
        console.log(
          '%c Line:47 🥚 result',
          'font-size:18px;color:#4fff4B;background:#42b983',
          result
        )
        break
      case PaymentTypeEnum.Linear: // 等额本金
      default:
        if (computeModel === 'rate') {
          rate = getLinearRate(formValues)
        }
        result = getMonthlyPayment({
          ...formValues,
          debtRate: rate,
        })
        break
    }

    setDebtResult({ ...formValues, ...result })
  }

  const onFinish = useCallback(onFinishRaw, [])

  return {
    form,
    debtPaymentType,
    computeModel,
    debtAccuracy,
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
  let debtTermArray =
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

  const lastMonthItem = debtTermArray[debtTermArray.length - 1]
  const { countPayInterest: totalInterest } = lastMonthItem

  return {
    debtMoney, // 借款本金
    debtRate, // 年利率
    totalInterest, // 利息总额
    debtTermArray, // 月供账单
  }
}

// 获取IRR
const getIrrRate = (result: DebtResult): number => {
  const { debtMoney, debtTermArray } = result
  const cashFlows = [-debtMoney].concat(
    debtTermArray.map(item => item.monthlyPay)
  )
  const irrRate = calculateIRR(cashFlows)

  return irrRate
}
