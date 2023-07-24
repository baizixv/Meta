import React from 'react'
import { Button, Form, InputNumber, Radio, Row, Typography } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import {
  formStyle,
  formItemStyle,
  rowButtonStyle,
  inputStyle,
  titleStyle,
} from './style'
import { PaymentTypeEnum } from '@/typings/configs/common'
import { useAction } from './action'
import { initialMoneyPriceFormValues } from '@/configs/router.config/tools-package/finance.config'

const DebtForm: React.FC<{
  formInstance: any
  computeModel: string
  debtAccuracy: number
  onFinish: (values: any) => void
}> = ({ formInstance, onFinish, computeModel, debtAccuracy }) => {
  const { isEdit, onValuesChange, onClickAfter } = useAction(
    formInstance,
    debtAccuracy
  )
  return (
    <Form
      layout="inline"
      form={formInstance}
      initialValues={initialMoneyPriceFormValues}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      style={formStyle}
    >
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
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio.Button value={PaymentTypeEnum.Annuity}>
              等额本息
            </Radio.Button>
            <Radio.Button value={PaymentTypeEnum.Linear}>等额本金</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Row>
      <Typography.Title level={5} style={titleStyle}>
        配置参数：
      </Typography.Title>
      <Row style={rowButtonStyle}>
        <Form.Item
          label="设置年化利率精度(百分比后小数位数)"
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
            label="年利率(APR)"
            name="debtRate"
            style={formItemStyle}
            rules={[{ required: true, message: '' }]}
          >
            <InputNumber
              addonAfter="%"
              placeholder=""
              step={10 ** -debtAccuracy}
            />
          </Form.Item>
        ) : (
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
                addonAfter={
                  isEdit ? '' : <EditOutlined onClick={onClickAfter} />
                }
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
                addonAfter={
                  isEdit ? <EditOutlined onClick={onClickAfter} /> : ''
                }
              />
            </Form.Item>
          </>
        )}
      </Row>

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
