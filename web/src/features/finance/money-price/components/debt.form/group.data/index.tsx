import React from 'react'
import { Row, Typography } from 'antd'
import { FormItemTerm } from './formitem-term'
import { FormItemRate } from './formitem-rate'
import { FormItemCount } from './formitem.count'
import { FormItemMoney } from './formitem-money'

// 表单项组-配置参数: 设置利率精度
const FormItemGroupData = ({
  titleStyle,
  rowButtonStyle,
  formItemStyle,
  inputStyle,
  isEdit,
  computeModel,
  debtAccuracy,
  onSelectMoneyUnit,
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
        <FormItemMoney {...{ formItemStyle, onSelectMoneyUnit }} />
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
