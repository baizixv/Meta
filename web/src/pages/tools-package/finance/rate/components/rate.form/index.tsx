import React from 'react'
import { Button, Form, Input, InputNumber, Row, Select, Typography } from 'antd'
import { formStyle, formItemStyle, titleStyle, inputStyle } from './style'
import {
  initialRateFormValues,
  termConfigs,
} from '@/configs/router.config/tools-package/finance.config'

const DebtForm: React.FC<{
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
      <Typography.Title level={5} style={titleStyle}>
        配置参数：
      </Typography.Title>
      <Row>
        <Form.Item label="每期单位" name="rateType" style={formItemStyle}>
          <Select style={{ width: 100 }} options={termConfigs} />
        </Form.Item>
        <Form.Item
          label="设置利率精度(百分比后小数位数)"
          name="rateAccuracy"
          style={formItemStyle}
        >
          <InputNumber
            placeholder="默认为2"
            step={1}
            min={0}
            max={10}
            precision={0}
          />
        </Form.Item>
      </Row>
      <Typography.Title level={5} style={titleStyle}>
        现金流输入：
      </Typography.Title>
      <Form.Item
        name="cashFlowStr"
        style={formItemStyle}
        rules={[{ required: true, message: '' }]}
      >
        <Input.TextArea
          placeholder="-1000,250,250,250"
          autoSize
          style={inputStyle}
        />
      </Form.Item>

      <Typography.Title level={5} style={titleStyle}>
        辅助现金流输入：
      </Typography.Title>
      <Form.Item name="helpCashFlowStr" style={formItemStyle}>
        <Input.TextArea autoSize style={inputStyle} />
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
