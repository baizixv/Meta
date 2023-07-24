import React from 'react'
import { Button, Form } from 'antd'
import {
  formStyle,
  formItemStyle,
  rowButtonStyle,
  inputStyle,
  titleStyle,
  submitButtonStyle,
} from './style'
import { useAction } from './action'
import { initialMoneyPriceFormValues } from '@/configs/router.config/tools-package/finance.config'
import FormItemGroupFactor from './group.factor'
import FormItemGroupSet from './group.set'
import FormItemGroupData from './group.data'

const DebtForm: React.FC<{
  formInstance: any
  computeModel: string
  debtAccuracy: number
  onFinish: (values: any) => void
}> = ({ formInstance, onFinish, computeModel, debtAccuracy }) => {
  const {
    isEdit,
    onValuesChange,
    onClickAfter,
    onSubmit,
    onSelectTermRatio,
    onSelectAPRType,
    onSelectRateRatio,
  } = useAction(formInstance, onFinish)

  return (
    <Form
      layout="inline"
      form={formInstance}
      initialValues={initialMoneyPriceFormValues}
      onFinish={onSubmit}
      onValuesChange={onValuesChange}
      style={formStyle}
    >
      <FormItemGroupSet {...{ titleStyle, rowButtonStyle, formItemStyle }} />
      <FormItemGroupFactor {...{ titleStyle, rowButtonStyle, formItemStyle }} />
      <FormItemGroupData
        {...{
          titleStyle,
          rowButtonStyle,
          formItemStyle,
          inputStyle,
          isEdit,
          computeModel,
          debtAccuracy,
          onSelectTermRatio,
          onSelectAPRType,
          onSelectRateRatio,
          onClickAfter,
        }}
      />

      <Button type="primary" htmlType="submit" style={submitButtonStyle}>
        开始计算
      </Button>
    </Form>
  )
}

export default DebtForm
