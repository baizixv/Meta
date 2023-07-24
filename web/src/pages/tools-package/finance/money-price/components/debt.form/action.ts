import { useEffect, useState } from 'react'
import { Form } from 'antd'
import { initialMoneyPriceFormValues } from '@/configs/router.config/tools-package/finance.config'
import { APRTypeEnum } from '@/typings/configs/common'

export const useAction = (formInstance: any, onFinish: Function) => {
  const debtCountMonthly = Form.useWatch('debtCountMonthly', formInstance)
  const debtTerm = Form.useWatch('debtTerm', formInstance)
  const [isEdit, setIsEdit] = useState(true)

  const [debtRatio, setDebtRatio] = useState({
    termRatio: 12, // 借款期数单位，默认为月
    APRType: APRTypeEnum.Year, // APR显示类型，默认为"year",年利率
    rateRatio: 100, // 利率单位系数，默认为百分比
  } as any)

  // 更新借款期数单位
  const onSelectTermRatio = (termRatio: number) =>
    setDebtRatio((prevState: any) => ({ ...prevState, termRatio }))
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
    onSelectTermRatio,
    onSelectAPRType,
    onSelectRateRatio,
  }
}

// 格式化表单输入值
const formatValues = (values: any, debtRatio: any = {}) => {
  const { debtCycleUnit, payCycleUnit, debtTerm, debtRate = 0 } = values || {}
  console.log(
    '%c Line:84 🍅 values',
    'font-size:18px;color:#93c0a4;background:#ffdd4d',
    values
  )
  console.log(
    '%c Line:67 🥪 debtRatio',
    'font-size:18px;color:#42b983;background:#e41a6a',
    debtRatio
  )
  const { rateRatio, APRType, termRatio } = debtRatio

  const realDebtTerm = debtTerm

  return {
    ...values,
    debtRate: debtRate / rateRatio, // 计算百分比换算后的真实每期利率
  }
}
