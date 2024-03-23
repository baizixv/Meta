import React from 'react'
import { Form, InputNumber, Select } from 'antd'
import { MoneyUnitTypeEnum, MoneyUnitTypeMap } from '@/typings/configs/common'
const { Option } = Select

// 表单项:借款本金
export const FormItemMoney = ({ formItemStyle, onSelectMoneyUnit }: any) => {
  return (
    <Form.Item
      label="借款本金"
      name="debtMoney"
      style={formItemStyle}
      rules={[{ required: true, message: '' }]}
    >
      <InputNumber
        addonBefore={
          <Select
            defaultValue={MoneyUnitTypeEnum.CNY}
            style={{ width: 60 }}
            onChange={onSelectMoneyUnit}
          >
            <Option value={MoneyUnitTypeEnum.CNY}>
              {MoneyUnitTypeMap[MoneyUnitTypeEnum.CNY]}
            </Option>
            <Option value={MoneyUnitTypeEnum.USD}>
              {MoneyUnitTypeMap[MoneyUnitTypeEnum.USD]}
            </Option>
            <Option value={MoneyUnitTypeEnum.EUR}>
              {MoneyUnitTypeMap[MoneyUnitTypeEnum.EUR]}
            </Option>
            <Option value={MoneyUnitTypeEnum.GBP}>
              {MoneyUnitTypeMap[MoneyUnitTypeEnum.GBP]}
            </Option>
          </Select>
        }
        placeholder="10000"
      />
    </Form.Item>
  )
}
