import React from 'react'
import { Input, Space, QRCode, Typography, Row, Col, Button } from 'antd'
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
const { Paragraph } = Typography

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
      <Paragraph>
        <blockquote className="meta_webtools_qrcode_blockquote">
          输入文本、链接生成二维码。若二维码无法扫码识别，可能是因为链接地址过长导致像素过于密集，可以通过
          size 配置二维码更大，或者通过短链接服务等方式将链接变短。
        </blockquote>
      </Paragraph>
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
