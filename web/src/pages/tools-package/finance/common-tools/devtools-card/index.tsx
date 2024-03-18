import React from 'react'
import ToolCard from './components/tool-card'
import { Col, Row, Input, Button, Space } from 'antd'
import useAction, { InputType, useButton } from './action'
import { InputValueType } from '@/typings/common'
import { DevToolsInputType } from '@/typings/configs/common'

const DevtoolsCard = ({
  title,
  encodeTitle,
  decodeTitle,
  handleEncode,
  handleDecode,
  inputType = InputType.StringType,
  encodePlaceholder = '输入值',
  decodePlaceholder = '输出值',
}: {
  title: string
  encodeTitle: string
  decodeTitle: string
  handleEncode: Function
  handleDecode: Function
  inputType?: DevToolsInputType
  encodePlaceholder?: string
  decodePlaceholder?: string
}) => {
  const { inputValue, outputValue, changeInput, changeOutput, setInputValue } =
    useAction({ inputType, handleDecode })
  return (
    <ToolCard
      title={title}
      extra={
        <ExtraButton
          encodeTitle={encodeTitle}
          decodeTitle={decodeTitle}
          inputValue={inputValue}
          inputType={inputType}
          setInputValue={setInputValue}
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
  inputType,
  changeOutput,
  setInputValue,
  handleEncode,
  handleDecode,
}: {
  inputValue: InputValueType
  inputType: DevToolsInputType
  encodeTitle: string
  decodeTitle: string
  changeOutput: (str: string) => void
  setInputValue: Function
  handleEncode: Function
  handleDecode: Function
}) => {
  const { handleEncry, handleDecry, getRandomButtonColor } = useButton({
    inputValue,
    inputType,
    changeOutput,
    setInputValue,
    handleEncode,
    handleDecode,
  })
  return (
    <React.Fragment>
      <Space wrap>
        <Button
          type="primary"
          style={{ backgroundColor: '#1e9fff' }}
          onClick={handleEncry}
        >
          {encodeTitle}
        </Button>
        <Button
          type="primary"
          style={{
            backgroundColor: getRandomButtonColor(),
          }}
          onClick={handleDecry}
        >
          {decodeTitle}
        </Button>
      </Space>
    </React.Fragment>
  )
}

export default DevtoolsCard
