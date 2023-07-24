import React from 'react'
import { Form, InputNumber, Select } from 'antd'
import { APRTypeEnum } from '@/typings/configs/common'

const { Option } = Select

// 表单项:借款期数
export const FormItemTerm = ({ onSelectTermRatio, formItemStyle }: any) => {
  return (
    <Form.Item
      label="借款期数"
      name="debtTerm"
      style={formItemStyle}
      rules={[{ required: true, message: '' }]}
    >
      <InputNumber
        addonAfter={
          <Select
            defaultValue={APRTypeEnum.Month}
            style={{ width: 60 }}
            onChange={onSelectTermRatio}
          >
            <Option value={APRTypeEnum.Year}>年</Option>
            <Option value={APRTypeEnum.Month}>月</Option>
            <Option value={APRTypeEnum.Day}>日</Option>
            <Option value={APRTypeEnum.Term}>期</Option>
          </Select>
        }
        placeholder="12"
        precision={0}
      />
    </Form.Item>
  )
}
