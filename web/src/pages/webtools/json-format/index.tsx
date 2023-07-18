import React from 'react'
import { Input, Space, Row, Col } from 'antd'
import './style.css'
import {
  inputColStyle,
  inputStyle,
  jsonSpaceStyle,
  codeColStyle,
  jsonWrapStyle,
} from './style'
import { useAction } from './action'

const JSONFormat: React.FC = () => {
  const { input, output, handleInput } = useAction()
  return (
    <Row style={jsonWrapStyle}>
      <Space style={jsonSpaceStyle}>
        <Col style={inputColStyle}>
          <Input.TextArea
            placeholder="在此处输入JSON字符串"
            autoSize
            value={input}
            style={inputStyle}
            onChange={handleInput}
          />
        </Col>
        <Col style={codeColStyle}>
          {/* <pre>
            <code>{input}</code>
          </pre> */}
          <Input.TextArea autoSize value={output} style={inputStyle} />
        </Col>
      </Space>
    </Row>
  )
}

export default JSONFormat
