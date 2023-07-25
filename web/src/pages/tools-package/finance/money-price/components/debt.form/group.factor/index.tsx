import React from 'react'
import { Form, InputNumber, Row, Typography } from 'antd'

// 表单项组-配置参数: 设置利率精度
const FormItemGroupFactor = ({
  titleStyle,
  rowButtonStyle,
  formItemStyle,
}: any) => {
  return (
    <>
      <Typography.Title level={5} style={titleStyle}>
        配置参数：
      </Typography.Title>
      <Row style={rowButtonStyle}>
        <Form.Item
          label="设置利率精度(小数位数)"
          name="debtAccuracy"
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
    </>
  )
}

export default FormItemGroupFactor
