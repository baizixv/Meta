import React from 'react'
import { Input, Space, QRCode, Row, Col, Button } from 'antd'
import {
  buttonStyle,
  inputColStyle,
  inputStyle,
  qrSpaceStyle,
  qrcodeColStyle,
  qrcodeStyle,
} from './style'
import { useAction } from './action'
import BlockquoteComp from '@/components/blockquote'

const QRCodeCard: React.FC = () => {
  const {
    input,
    changeInput,
    qrcodeText,
    handleBuildQRcode,
    handleDownloadQRCode,
  } = useAction()
  return (
    <Row style={qrcodeStyle}>
      <BlockquoteComp blockquoteDesc="输入文本、链接生成二维码。若二维码无法扫码识别，可能是因为链接地址过长，像素过于密集。过长也可能无法正常生成。" />
      <Space style={qrSpaceStyle}>
        <Col style={inputColStyle}>
          <Input.TextArea
            placeholder="此处输入文字或链接"
            autoSize={{ minRows: 15, maxRows: 15 }}
            value={input}
            style={inputStyle}
            onChange={changeInput}
          />
          <Button
            type="primary"
            style={buttonStyle}
            onClick={handleBuildQRcode}
          >
            生成二维码
          </Button>
        </Col>
        <Col style={qrcodeColStyle} id="myQRCode">
          <QRCode size={300} value={qrcodeText} />
          <Button
            type="primary"
            style={buttonStyle}
            onClick={handleDownloadQRCode}
          >
            下载至本地
          </Button>
        </Col>
      </Space>
    </Row>
  )
}

export default QRCodeCard
