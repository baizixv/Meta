import { useEffect, useState } from 'react'
import { Form } from 'antd'
import { DebtResult } from '@/typings/pages/tools-package/finance/money-price'
import { initialRateFormValues } from '@/configs/router.config/tools-package/finance.config'

export const useAction = () => {
  const [form] = Form.useForm()

  const [rateResult, setRateResult] = useState<any>({
    irrRate: 0,
  })

  const onFinish = (values: any) => {
    let result: DebtResult = {} as DebtResult
    switch (values.debtPaymentType) {
    }

    setRateResult(result)
  }

  // 初始进入页面就更新一次，以便显示出数值
  useEffect(() => {
    onFinish(initialRateFormValues)
  }, [])

  return {
    form,
    rateResult,
    onFinish,
  }
}
