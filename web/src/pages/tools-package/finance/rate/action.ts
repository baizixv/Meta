import { useEffect, useState } from 'react'
import { Form, message } from 'antd'
import { initialRateFormValues } from '@/configs/router.config/tools-package/finance.config'
import { RateResult } from '@/typings/pages/tools-package/finance/rate'
import { calculateIRR } from '@/utils/finance/IRR'

export const useAction = () => {
  const [form] = Form.useForm()

  const [rateResult, setRateResult] = useState<RateResult>({
    irrRate: 0,
  })

  const onFinish = (values: any) => {
    const { cashFlowStr } = values
    console.log(
      '%c Line:16 🍖 cashFlowStr',
      'font-size:18px;color:#2eafb0;background:#ffdd4d',
      cashFlowStr
    )
    const cashFlows = getCashFlows(cashFlowStr)
    console.log(
      '%c Line:17 🍌 cashFlows',
      'font-size:18px;color:#3f7cff;background:#f5ce50',
      cashFlows
    )
    const irrRate = cashFlows.length > 0 ? calculateIRR(cashFlows) : 0
    console.log(
      '%c Line:28 🍺 irrRate',
      'font-size:18px;color:#465975;background:#ea7e5c',
      irrRate
    )

    setRateResult({
      irrRate,
    })
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

const getCashFlows = (cashFlowsStr: string = '') => {
  let results = [] as number[]
  const regExp = /\n|\r\n|,|，/g

  const strArr = cashFlowsStr.split(regExp)

  for (const str of strArr) {
    if (str) {
      const num = +str
      if (isNaN(num)) {
        message.warning('请输入正确格式的现金流')
        return []
      }
      results.push(num)
    }
  }

  return results
}
