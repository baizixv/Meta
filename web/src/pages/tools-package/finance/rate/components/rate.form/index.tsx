import React from 'react'
import { Button, Form, Input, InputNumber, Radio, Row } from 'antd'
import { formStyle, formItemStyle, rowButtonStyle } from './style'
import { PaymentTypeEnum } from '@/typings/configs/common'
import { useAction } from './action'
import { initialFormValues } from '@/configs/router.config/tools-package/finance.config'

const DebtForm: React.FC<{
  formInstance: any
  computeModel: string
  debtAccuracy: number
  onFinish: (values: any) => void
}> = ({ formInstance, onFinish, computeModel, debtAccuracy }) => {
  const { onValuesChange, formatter, parser } = useAction(
    formInstance,
    debtAccuracy
  )
  return (
    <Form
      layout="inline"
      form={formInstance}
      initialValues={initialFormValues}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      style={formStyle}
    >
      <Row>
        <Form.Item
          label="借款本金"
          name="debtMoney"
          style={formItemStyle}
          rules={[{ required: true, message: '' }]}
        >
          <Input.TextArea
            placeholder="在此处输入JSON字符串"
            autoSize
            // value={input}
            // style={inputStyle}
            // onChange={handleInput}
          />
        </Form.Item>
        <Form.Item
          label="借款期数"
          name="debtTerm"
          style={formItemStyle}
          rules={[{ required: true, message: '' }]}
        >
          <InputNumber addonAfter="期" placeholder="12" precision={0} />
        </Form.Item>
        {computeModel === 'debt-list' ? (
          <Form.Item
            label="年利率"
            name="debtRate"
            style={formItemStyle}
            rules={[{ required: true, message: '' }]}
          >
            <InputNumber
              addonAfter="%"
              placeholder="=每期利率 x 借款期数"
              step={0.01 * 10 ** -debtAccuracy}
              formatter={formatter}
              parser={parser}
            />
          </Form.Item>
        ) : (
          <>
            {/* 每月还款额只是个显示项目，其实并不参与表单计算 */}
            <Form.Item
              label="每期还款额"
              name="debtCountMonthly"
              style={formItemStyle}
              rules={[{ required: true, message: '' }]}
            >
              <InputNumber addonBefore="¥" placeholder="11347.2" />
            </Form.Item>
            <Form.Item label="总还款额" name="debtCount" style={formItemStyle}>
              <InputNumber
                addonBefore="¥"
                placeholder="每期还款额 x 借款期数"
              />
            </Form.Item>
          </>
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
