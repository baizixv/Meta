import { useEffect, useState } from 'react'
import { Form } from 'antd'
import { initialMoneyPriceFormValues } from '@/configs/router.config/tools-package/finance.config'
import {
  APRTypeEnum,
  APRTypeEnumRatioMap,
  MoneyUnitTypeEnum,
} from '@/typings/configs/common'

export const useAction = (formInstance: any, onFinish: Function) => {
  const debtCountMonthly = Form.useWatch('debtCountMonthly', formInstance)
  const debtTerm = Form.useWatch('debtTerm', formInstance)
  const [isEdit, setIsEdit] = useState(true)

  const [debtRatio, setDebtRatio] = useState({
    moneyUnit: MoneyUnitTypeEnum.CNY,
    termRatioUnit: APRTypeEnum.Month, // 借款期数单位，默认为月
    APRType: APRTypeEnum.Year, // APR显示类型，默认为"year",年利率
    rateRatio: 100, // 利率单位系数，默认为百分比
  } as any)

  // 更新借款本金单位
  const onSelectMoneyUnit = (moneyUnit: string) =>
    setDebtRatio({ ...debtRatio, moneyUnit })

  // 更新借款期数单位
  const onSelectTermRatio = (termRatioUnit: number) =>
    setDebtRatio((prevState: any) => ({ ...prevState, termRatioUnit }))
  // 更新APRType
  const onSelectAPRType = (APRType: string) =>
    setDebtRatio((prevState: any) => ({ ...prevState, APRType }))
  // 更新利率单位系数
  const onSelectRateRatio = (rateRatio: number) =>
    setDebtRatio((prevState: any) => ({ ...prevState, rateRatio }))

  const onValuesChange = (values: any) => {
    switch (true) {
      case values['debtCount'] !== undefined:
        formInstance.setFieldValue(
          'debtCountMonthly',
          values['debtCount'] / debtTerm
        )
        break
      case values['debtCountMonthly'] !== undefined:
        formInstance.setFieldValue(
          'debtCount',
          values['debtCountMonthly'] * debtTerm
        )
        break
      case values['debtTerm'] !== undefined:
        formInstance.setFieldValue(
          'debtCount',
          debtCountMonthly * values['debtTerm']
        )
        break
    }
  }

  const onClickAfter = () => {
    setIsEdit(!isEdit)
  }

  const onSubmit = (values: any) => {
    const formValues = formatValues(values, debtRatio)
    console.log(
      '%c Line:65 🍊 formValues',
      'font-size:18px;color:#6ec1c2;background:#33a5ff',
      formValues
    )
    onFinish(formValues)
  }

  // 初始进入页面就更新一次，以便显示出数值
  useEffect(() => {
    onSubmit(initialMoneyPriceFormValues)
  }, [])

  return {
    isEdit,
    onValuesChange,
    onClickAfter,
    onSubmit,
    setDebtRatio,
    onSelectMoneyUnit,
    onSelectTermRatio,
    onSelectAPRType,
    onSelectRateRatio,
  }
}

// 格式化表单输入值，提供真正参与计算的校正后的参数
const formatValues = (values: any, debtRatio: any = {}) => {
  const { debtCycleUnit, payCycleUnit, debtTerm, debtRate = 0 } = values || {}
  const { rateRatio, APRType, termRatioUnit } = debtRatio

  const debtCycleUnitRatio = APRTypeEnumRatioMap[debtCycleUnit as APRTypeEnum]
  const termRatioUnitRatio = APRTypeEnumRatioMap[termRatioUnit as APRTypeEnum]
  const APRTypeRatio = APRTypeEnumRatioMap[APRType as APRTypeEnum]

  const realDebtTerm =
    debtCycleUnitRatio < 0 || termRatioUnitRatio < 0 // 单位为期，则单纯以输入期数为准
      ? debtTerm
      : debtTerm * (debtCycleUnitRatio / termRatioUnitRatio)

  // TODO:日月换算-365还是360
  const realDebtRate =
    APRTypeRatio < 0 || debtCycleUnitRatio < 0 // 单位为期，则单纯以输入利率为准
      ? debtRate / rateRatio
      : (debtRate / rateRatio) * (APRTypeRatio / debtCycleUnitRatio)

  return {
    ...values,
    debtRatio,
    moneyUnit: debtRatio.moneyUnit,
    debtTerm: realDebtTerm,
    debtRate: realDebtRate, // 计算百分比换算后的真实每期利率
    debtCycleUnitRatio,
  }
}
