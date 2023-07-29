import React from 'react'
import { Form } from 'antd'
import { formStyle, formItemStyle, titleStyle, inputStyle } from './style'
import { initialRateFormValues } from '@/configs/router.config/tools-package/finance.config'
import { FormItemGroupSet } from './group.set'
import { FormItemGroupData } from './group.data'
import { FormSubmit } from '@/components/form/form-submit'

const TimeValueForm: React.FC<{
  formInstance: any
  onFinish: (values: any) => void
}> = ({ formInstance, onFinish }) => {
  return (
    <Form
      layout="inline"
      form={formInstance}
      initialValues={initialRateFormValues}
      onFinish={onFinish}
      style={formStyle}
    >
      <FormItemGroupSet {...{ formItemStyle, titleStyle }} />
      <FormItemGroupData {...{ formItemStyle, titleStyle, inputStyle }} />
      <FormSubmit />
    </Form>
  )
}

export default TimeValueForm
