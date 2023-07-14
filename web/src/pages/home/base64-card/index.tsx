import React from 'react'
import ToolCard from '@/components/card/tool-card'
import { Col, Row, Input, Button, Space } from 'antd'
import useAction, { useButton } from './action'
import { InputValueType } from '@/typings/common'

const Base64Card: React.FC = () => {
  const { inputValue, outputValue, changeInput, changeOutput } = useAction()
  return (
    <ToolCard
      title="BASE64加密"
      extra={
        <ExtraButton inputValue={inputValue} changeOutput={changeOutput} />
      }
    >
      <Row gutter={[16, 8]}>
        <Col span={24}>
          <Input
            placeholder="输入值"
            value={inputValue}
            onChange={changeInput}
          />
        </Col>
        <Col span={24}>
          <Input placeholder="输出值" value={outputValue} />
        </Col>
      </Row>
    </ToolCard>
  )
}

const ExtraButton = ({
  inputValue,
  changeOutput,
}: {
  inputValue: InputValueType
  changeOutput: (str: string) => void
}) => {
  const { handleEncry, handleDecry } = useButton({ inputValue, changeOutput })
  return (
    <React.Fragment>
      <Space wrap>
        <Button type="primary" onClick={handleEncry}>
          Base64加密
        </Button>
        <Button type="primary" onClick={handleDecry}>
          Base64解密
        </Button>
      </Space>
    </React.Fragment>
  )
}

export default Base64Card
