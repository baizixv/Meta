import React from 'react'
import { Input, Space, Typography, Row, Col, Button } from 'antd'
import './style.css'
import {
  buttonStyle,
  inputColStyle,
  inputStyle,
  qrSpaceStyle,
  qrcodeColStyle,
  qrcodeStyle,
} from './style'
import { useAction } from './action'

const JSONFormat: React.FC = () => {
  const { input, changeInput } = useAction()
  return (
    <Row style={qrcodeStyle}>
      <Space style={qrSpaceStyle}>
        <Col style={inputColStyle}>
          <Input.TextArea
            placeholder="在此处输入JSON字符串"
            autoSize
            value={input}
            style={inputStyle}
            onChange={changeInput}
          />
        </Col>
        <Col style={qrcodeColStyle}>
          {/* <pre>
            <code>{input}</code>
          </pre> */}
          <Input.TextArea
            autoSize
            value={input}
            style={inputStyle}
            onChange={changeInput}
          />
        </Col>
      </Space>
    </Row>
  )
}

export default JSONFormat
