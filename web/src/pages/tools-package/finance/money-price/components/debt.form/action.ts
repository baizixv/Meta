import { Form } from 'antd'
import { fixed2 } from '@/utils/format/number'
import { useState } from 'react'

export const useAction = (formInstance: any, debtAccuracy: number) => {
  const [isEdit, setIsEdit] = useState(true)
  const debtCountMonthly = Form.useWatch('debtCountMonthly', formInstance)
  const debtTerm = Form.useWatch('debtTerm', formInstance)

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
    onValuesChange,
    onClickAfter,
  }
}
