import React from 'react'
import ToolCard from './components/tool-card'
import { Col, Row, Input, Button, Space } from 'antd'
import useAction, { useButton } from './action'
import { InputValueType } from '@/typings/common'

const DevtoolsCard = ({
  title,
  encodeTitle,
  decodeTitle,
  handleEncode,
  handleDecode,
  encodePlaceholder = '输入值',
  decodePlaceholder = '输出值',
}: {
  title: string
  encodeTitle: string
  decodeTitle: string
  handleEncode: Function
  handleDecode: Function
  encodePlaceholder?: string
  decodePlaceholder?: string
}) => {
  const { inputValue, outputValue, changeInput, changeOutput } = useAction()
  return (
    <ToolCard
      title={title}
      extra={
        <ExtraButton
          encodeTitle={encodeTitle}
          decodeTitle={decodeTitle}
          inputValue={inputValue}
          changeOutput={changeOutput}
          handleEncode={handleEncode}
          handleDecode={handleDecode}
        />
      }
    >
      <Row gutter={[16, 8]}>
        <Col span={24}>
          <Input
            placeholder={encodePlaceholder}
            value={inputValue}
            onChange={changeInput}
          />
        </Col>
        <Col span={24}>
          <Input placeholder={decodePlaceholder} value={outputValue} />
        </Col>
      </Row>
    </ToolCard>
  )
}

const ExtraButton = ({
  inputValue,
  encodeTitle,
  decodeTitle,
  changeOutput,
  handleEncode,
  handleDecode,
}: {
  inputValue: InputValueType
  encodeTitle: string
  decodeTitle: string
  changeOutput: (str: string) => void
  handleEncode: Function
  handleDecode: Function
}) => {
  const { handleEncry, handleDecry } = useButton({
    inputValue,
    changeOutput,
    handleEncode,
    handleDecode,
  })
  return (
    <React.Fragment>
      <Space wrap>
        <Button type="primary" onClick={handleEncry}>
          {encodeTitle}
        </Button>
        <Button type="primary" onClick={handleDecry}>
          {decodeTitle}
        </Button>
      </Space>
    </React.Fragment>
  )
}

export default DevtoolsCard
