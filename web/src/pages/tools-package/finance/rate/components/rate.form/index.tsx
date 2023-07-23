import React from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { formStyle, formItemStyle, titleStyle, inputStyle } from './style'
import { initialRateFormValues } from '@/configs/router.config/tools-package/finance.config'

const DebtForm: React.FC<{
  formInstance: any
  onFinish: (values: any) => void
}> = ({ formInstance, onFinish }) => {
  return (
    <Form
      layout="vertical"
      form={formInstance}
      initialValues={initialRateFormValues}
      onFinish={onFinish}
      style={formStyle}
    >
      <Form.Item style={formItemStyle}>
        <Typography.Title level={5} style={titleStyle}>
          现金流输入：
        </Typography.Title>
        <Form.Item
          name="cashFlowStr"
          noStyle
          rules={[{ required: true, message: '' }]}
        >
          <Input.TextArea
            placeholder="-1000,250,250,250"
            autoSize
            style={inputStyle}
          />
        </Form.Item>
      </Form.Item>
      <Form.Item style={formItemStyle}>
        <Typography.Title level={5} style={titleStyle}>
          辅助现金流输入：
        </Typography.Title>
        <Form.Item name="helpCashFlowStr" noStyle>
          <Input.TextArea autoSize style={inputStyle} />
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
