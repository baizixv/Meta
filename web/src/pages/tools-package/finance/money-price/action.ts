import { useCallback, useEffect, useState } from 'react'
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
import { initialMoneyPriceFormValues } from '@/configs/router.config/tools-package/finance.config'
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
    debtMonthArray: [],
    totalInterest: 0,
    debtMoney: 0,
    debtRate: 0,
  })

  const onFinishRaw = (values: any) => {
    let result: DebtResult = {} as DebtResult
    const formValues = formatValues(values)
    let rate = formValues.debtRate

    switch (values.debtPaymentType) {
      case PaymentTypeEnum.Annuity: // 等额本息
        if (computeModel === 'rate') {
          rate = getAnnuityRate(formValues)
        }
        result = getMonthlyPayment({
          ...formValues,
          debtRate: rate,
        })
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

    const debtIrrRate = getIrrRate(result)

    setDebtResult({ ...result, debtIrrRate })
  }

  const onFinish = useCallback(onFinishRaw, [])

  // 初始进入页面就更新一次，以便显示出数值
  useEffect(() => {
    onFinish(initialMoneyPriceFormValues)
  }, [onFinish])

  return {
    form,
    debtPaymentType,
    computeModel,
    debtAccuracy,
    debtResult,
    onFinish,
  }
}

// 格式化表单输入值
const formatValues = (values: any) => {
  const { debtRate = 0 } = values || {}

  return {
    ...values,
    debtRate: debtRate / 100, // 计算百分比换算后的真实数字
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

// 获取IRR
const getIrrRate = (result: DebtResult): number => {
  const { debtMoney, debtMonthArray } = result
  const cashFlows = [-debtMoney].concat(
    debtMonthArray.map(item => item.monthlyPay)
  )
  const irrRate = calculateIRR(cashFlows)

  return irrRate
}
