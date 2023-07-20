import React from 'react'
import { Button, Form, Input, Radio, Row } from 'antd'
import { formStyle, formItemStyle, rowButtonStyle } from './style'
import { PaymentType } from '@/typings/configs/common'

const DebtForm: React.FC<{
  formInstance: any
  computeModel: string
  onFinish: (values: any) => void
  onFinishFailed: (errorInfo: any) => void
}> = ({ formInstance, onFinish, onFinishFailed, computeModel }) => {
  return (
    <Form
      layout="inline"
      form={formInstance}
      initialValues={{
        debtMoney: 10000,
        debtTerm: 12,
        debtRate: 24,
        debtPaymentType: PaymentType.Annuity,
        debtCount: 11347.2,
        computeModel: 'debt-list',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={formStyle}
    >
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
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio.Button value={PaymentType.Annuity}>等额本息</Radio.Button>
            <Radio.Button value={PaymentType.Linear}>等额本金</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          label="借款本金（元）"
          name="debtMoney"
          style={formItemStyle}
          rules={[{ required: true, message: '' }]}
        >
          <Input placeholder="10000" />
        </Form.Item>
        <Form.Item
          label="借款期限（月）"
          name="debtTerm"
          style={formItemStyle}
          rules={[{ required: true, message: '' }]}
        >
          <Input placeholder="12" />
        </Form.Item>
        {computeModel === 'debt-list' ? (
          <Form.Item
            label="年化利率（%）"
            name="debtRate"
            style={formItemStyle}
            rules={[{ required: true, message: '' }]}
          >
            <Input placeholder="24" />
          </Form.Item>
        ) : (
          <Form.Item
            label="总还款额（元）"
            name="debtCount"
            style={formItemStyle}
            rules={[{ required: true, message: '' }]}
          >
            <Input placeholder="11347.2" />
          </Form.Item>
        )}
      </Row>
      <Row style={rowButtonStyle}></Row>

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
