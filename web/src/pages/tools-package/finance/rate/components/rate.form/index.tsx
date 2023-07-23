import React from 'react'
import { Button, Form, Input, Row, Typography } from 'antd'
import {
  formStyle,
  formItemStyle,
  rowButtonStyle,
  titleStyle,
  inputStyle,
} from './style'
import { useAction } from './action'
import { initialRateFormValues } from '@/configs/router.config/tools-package/finance.config'

const DebtForm: React.FC<{
  formInstance: any
  computeModel: string
  debtAccuracy: number
  onFinish: (values: any) => void
}> = ({ formInstance, onFinish, computeModel, debtAccuracy }) => {
  const { onValuesChange, formatter, parser } = useAction(
    formInstance,
    debtAccuracy
  )
  return (
    <Form
      layout="vertical"
      form={formInstance}
      initialValues={initialRateFormValues}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      style={formStyle}
    >
      <Form.Item style={formItemStyle}>
        <Typography.Title level={5} style={titleStyle}>
          现金流输入：
        </Typography.Title>
        <Form.Item
          name="debtMoney"
          noStyle
          rules={[{ required: true, message: '' }]}
        >
          <Input.TextArea
            placeholder="-1000，250，250，250"
            autoSize
            // value={input}
            style={inputStyle}
            // onChange={handleInput}
          />
        </Form.Item>
      </Form.Item>
      <Form.Item style={formItemStyle}>
        <Typography.Title level={5} style={titleStyle}>
          辅助现金流输入：
        </Typography.Title>
        <Form.Item name="debtMoney" noStyle>
          <Input.TextArea
            placeholder="-1000，250，250，250"
            autoSize
            // value={input}
            style={inputStyle}
            // onChange={handleInput}
          />
        </Form.Item>
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        style={{
          alignSelf: 'flex-start',
          backgroundColor: '#5cb85c',
          borderColor: '#4cae4c',
        }}
      >
        开始计算
      </Button>
    </Form>
  )
}

export default DebtForm
