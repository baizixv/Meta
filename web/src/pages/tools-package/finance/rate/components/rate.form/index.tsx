import React from 'react'
import { Button, Form, Input, InputNumber, Radio, Row, Typography } from 'antd'
import {
  formStyle,
  formItemStyle,
  rowButtonStyle,
  titleStyle,
  inputStyle,
} from './style'
import { PaymentTypeEnum } from '@/typings/configs/common'
import { useAction } from './action'
import { initialFormValues } from '@/configs/router.config/tools-package/finance.config'

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
      initialValues={initialFormValues}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      style={formStyle}
    >
      <Form.Item
        name="debtMoney"
        style={formItemStyle}
        rules={[{ required: true, message: '' }]}
      >
        <Typography.Title level={5} style={titleStyle}>
          现金流输入：
        </Typography.Title>
        <Input.TextArea
          placeholder="-1000，250，250，250"
          autoSize
          // value={input}
          style={inputStyle}
          // onChange={handleInput}
        />
      </Form.Item>
      <Form.Item
        name="debtMoney"
        style={formItemStyle}
        // rules={[{ required: true, message: '' }]}
      >
        <Typography.Title level={5} style={titleStyle}>
          辅助现金流输入：
        </Typography.Title>
        <Input.TextArea
          placeholder="-1000，250，250，250"
          autoSize
          // value={input}
          style={inputStyle}
          // onChange={handleInput}
        />
      </Form.Item>

      <Row style={rowButtonStyle}></Row>

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
