import React from 'react'
import { Form, Input, Typography } from 'antd'

export const FormItemGroupData = ({
  titleStyle,
  inputStyle,
  formItemStyle,
}: any) => {
  return (
    <>
      <Typography.Title level={5} style={titleStyle}>
        计算参数：
      </Typography.Title>
      <Form.Item
        name="cashFlowStr"
        style={formItemStyle}
        rules={[{ required: true, message: '' }]}
      >
        <Input.TextArea
          placeholder="-1000,250"
          autoSize
          style={inputStyle}
          allowClear
        />
      </Form.Item>
    </>
  )
}
