import React from 'react'
import { Form, Radio, Row, Select, Typography } from 'antd'
import { APRTypeEnum, PaymentTypeEnum } from '@/typings/configs/common'
const { Option } = Select

// 表单项组-设置模式：计算模式，还款方式，计息周期，还款周期
const FormItemGroupSet = ({
  titleStyle,
  rowButtonStyle,
  formItemStyle,
}: any) => {
  return (
    <>
      <Typography.Title level={5} style={titleStyle}>
        设置模式：
      </Typography.Title>
      <Row style={rowButtonStyle}>
        <Form.Item label="计算模式" name="computeModel" style={formItemStyle}>
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio.Button value="debt-list">计算月供</Radio.Button>
            <Radio.Button value="rate">反推利率</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="还款方式"
          name="debtPaymentType"
          style={formItemStyle}
        >
          <Select style={{ width: 120 }}>
            <Option value={PaymentTypeEnum.Annuity}>等额本息</Option>
            <Option value={PaymentTypeEnum.Linear}>等额本金</Option>
            {/* <Option value={PaymentTypeEnum.InterestOnly}>先息后本</Option>
            <Option value={PaymentTypeEnum.Once}>后息后本</Option>
            <Option value={PaymentTypeEnum.Equal}>等本等息</Option>
            <Option value={PaymentTypeEnum.FrontLoaded}>砍头息</Option>
            <Option value={PaymentTypeEnum.Balloon}>气球贷</Option> */}
          </Select>
        </Form.Item>
        <Form.Item label="计息周期" name="debtCycleUnit" style={formItemStyle}>
          <Select style={{ width: 60 }}>
            <Option value={APRTypeEnum.Year}>年</Option>
            <Option value={APRTypeEnum.Month}>月</Option>
            <Option value={APRTypeEnum.Day}>日</Option>
            <Option value={APRTypeEnum.Term}>期</Option>
          </Select>
        </Form.Item>
        <Form.Item label="还款周期" name="payCycleUnit" style={formItemStyle}>
          <Select style={{ width: 60 }}>
            <Option value={APRTypeEnum.Year}>年</Option>
            <Option value={APRTypeEnum.Month}>月</Option>
            <Option value={APRTypeEnum.Day}>日</Option>
            <Option value={APRTypeEnum.Term}>期</Option>
          </Select>
        </Form.Item>
      </Row>
    </>
  )
}

export default FormItemGroupSet
