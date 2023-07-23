import { Form } from 'antd'
import { fixed2 } from '@/utils/format/number'
import { useState } from 'react'

export const useAction = (formInstance: any, debtAccuracy: number) => {
  const [isEdit, setIsEdit] = useState(true)
  const debtCountMonthly = Form.useWatch('debtCountMonthly', formInstance)
  const debtTerm = Form.useWatch('debtTerm', formInstance)
  const formatter = (value: number | undefined, _: any) => {
    if (value) {
      const showValue = +value * 100
      return `${fixed2(showValue, debtAccuracy)}`
    }
    return ''
  }

  const parser = (strV: string | undefined): any => {
    if (strV) {
      const realValue = +strV / 100
      return +fixed2(realValue, debtAccuracy + 2)
    }
  }

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

  return {
    isEdit,
    formatter,
    parser,
    onValuesChange,
    onClickAfter,
  }
}
