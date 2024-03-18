import React from 'react'
import { Form, InputNumber, Select } from 'antd'
import { APRTypeEnum, APRTypeEnumRateMap } from '@/typings/configs/common'
const { Option } = Select

// 表单项:利率
export const FormItemRate = ({
  formItemStyle,
  debtAccuracy,
  onSelectAPRType,
  onSelectRateRatio,
}: any) => {
  return (
    <Form.Item
      name="debtRate"
      style={formItemStyle}
      rules={[{ required: true, message: '' }]}
    >
      <InputNumber
        addonBefore={
          <Select
            defaultValue={APRTypeEnum.Year}
            style={{ width: 100 }}
            onChange={onSelectAPRType}
          >
            <Option value={APRTypeEnum.Year}>
              {APRTypeEnumRateMap[APRTypeEnum.Year]}
            </Option>
            <Option value={APRTypeEnum.Month}>
              {APRTypeEnumRateMap[APRTypeEnum.Month]}
            </Option>
            <Option value={APRTypeEnum.Day}>
              {APRTypeEnumRateMap[APRTypeEnum.Day]}
            </Option>
            <Option value={APRTypeEnum.Term}>
              {APRTypeEnumRateMap[APRTypeEnum.Term]}
            </Option>
          </Select>
        }
        addonAfter={
          <Select
            defaultValue={100}
            style={{ width: 60 }}
            onChange={onSelectRateRatio}
          >
            <Option value={100}>%</Option>
            <Option value={1}>x1</Option>
          </Select>
        }
        placeholder=""
        step={10 ** -debtAccuracy}
      />
    </Form.Item>
  )
}
