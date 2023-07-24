import React from 'react'
import { Form, InputNumber, Row, Typography } from 'antd'
import { FormItemTerm } from './formitem-term'
import { FormItemRate } from './formitem-rate'
import { FormItemCount } from './formitem.count'

// 表单项组-配置参数: 设置利率精度
const FormItemGroupData = ({
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
}: any) => {
  return (
    <>
      <Typography.Title level={5} style={titleStyle}>
        数据收集：
      </Typography.Title>
      <Row style={rowButtonStyle}>
        <Form.Item
          label="借款本金"
          name="debtMoney"
          style={formItemStyle}
          rules={[{ required: true, message: '' }]}
        >
          <InputNumber addonBefore="¥" placeholder="10000" />
        </Form.Item>
        <FormItemTerm {...{ formItemStyle, onSelectTermRatio }} />
        {computeModel === 'debt-list' ? (
          <FormItemRate
            {...{
              formItemStyle,
              debtAccuracy,
              onSelectAPRType,
              onSelectRateRatio,
            }}
          />
        ) : (
          <FormItemCount
            {...{ formItemStyle, inputStyle, isEdit, onClickAfter }}
          />
        )}
      </Row>
    </>
  )
}

export default FormItemGroupData
