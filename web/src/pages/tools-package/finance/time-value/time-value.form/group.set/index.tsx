import React from 'react'
import { Form, InputNumber, Row, Select, Typography } from 'antd'
import { termConfigs } from '@/configs/router.config/tools-package/finance.config'

export const FormItemGroupSet = ({ titleStyle, formItemStyle }: any) => {
  return (
    <>
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
    </>
  )
}
