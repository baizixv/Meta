import { Form } from 'antd'

export const useAction = () => {
  const [form] = Form.useForm()
  const debtPaymentType = Form.useWatch('debtPaymentType', form)
  const computeModel = Form.useWatch('computeModel', form)
  const onFinish = (values: any) => {
    console.log(
      '%c Line:8 🍑 values',
      'font-size:18px;color:#fca650;background:#e41a6a',
      values
    )
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log(
      '%c Line:16 🍯 errorInfo',
      'font-size:18px;color:#42b983;background:#ed9ec7',
      errorInfo
    )
  }
  return { form, debtPaymentType, computeModel, onFinish, onFinishFailed }
}
