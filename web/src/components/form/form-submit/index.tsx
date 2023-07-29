import React from 'react'
import { Button } from 'antd'

export const FormSubmit = ({ text = '开始计算', style = {} }: any) => {
  return (
    <Button
      type="primary"
      htmlType="submit"
      style={{
        alignSelf: 'flex-start',
        backgroundColor: '#5cb85c',
        borderColor: '#4cae4c',
        ...style,
      }}
    >
      {text}
    </Button>
  )
}
