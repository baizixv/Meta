import React from 'react'
import { Form, InputNumber } from 'antd'
import { EditOutlined } from '@ant-design/icons'

// 表单项:还款额
export const FormItemCount = ({
  formItemStyle,
  inputStyle,
  isEdit,
  onClickAfter,
}: any) => {
  return (
    <>
      {/* 每月还款额只是个显示项目，其实并不参与表单计算,参与计算的是总还款额 */}
      <Form.Item
        label="每期还款额"
        name="debtCountMonthly"
        style={formItemStyle}
        rules={[{ required: isEdit, message: '' }]}
      >
        <InputNumber
          addonBefore="¥"
          placeholder="11347.2"
          disabled={!isEdit}
          style={inputStyle}
          addonAfter={isEdit ? '' : <EditOutlined onClick={onClickAfter} />}
        />
      </Form.Item>
      <Form.Item
        label="总还款额(每期还款额x借款期数)"
        name="debtCount"
        style={formItemStyle}
        rules={[{ required: !isEdit, message: '' }]}
      >
        <InputNumber
          addonBefore="¥"
          placeholder="每期还款额 x 借款期数"
          disabled={isEdit}
          addonAfter={isEdit ? <EditOutlined onClick={onClickAfter} /> : ''}
        />
      </Form.Item>
    </>
  )
}
