import { useEffect, useState } from 'react'
import { Form, message } from 'antd'
import {
  initialRateFormValues,
  termConfigs,
} from '@/configs/router.config/tools-package/finance.config'
import { RateResult } from '@/typings/pages/tools-package/finance/rate'
import { calculateIRR } from '@/utils/finance/IRR'

export const useAction = () => {
  const [form] = Form.useForm()
  const rateAccuracy = Form.useWatch('rateAccuracy', form)
  const rateType = Form.useWatch('rateType', form)
  const rateCount = termConfigs.find(item => item.value === rateType)?.count
  console.log(
    '%c Line:10 🍬 rateAccuracy',
    'font-size:18px;color:#4fff4B;background:#7f2b82',
    rateAccuracy
  )

  const [rateResult, setRateResult] = useState<RateResult>({
    irrRate: 0,
  })

  const onFinish = (values: any) => {
    const { cashFlowStr, helpCashFlowStr } = values
    const cashFlows = getCashFlows(cashFlowStr)
    const helpCashFlows = getCashFlows(helpCashFlowStr)
    const realCashFlows = getRealCashFlows(cashFlows, helpCashFlows)
    const irrRate = cashFlows.length > 0 ? calculateIRR(realCashFlows) : 0

    setRateResult({
      cashFlows: realCashFlows,
      irrRate,
    })
  }

  // 初始进入页面就更新一次，以便显示出数值
  useEffect(() => {
    onFinish(initialRateFormValues)
  }, [])

  return {
    form,
    rateAccuracy,
    rateCount,
    rateResult,
    onFinish,
  }
}

// 合并现金流输入和辅助输入，得到真正的现金流
const getRealCashFlows = (cashFlows: number[], helpCashFlows: number[]) => {
  if (helpCashFlows.length === 0) return cashFlows
  const realCashFlows = [] as number[]

  cashFlows.forEach((cash, index) => {
    let count = 1
    if (helpCashFlows[index] > 0) {
      count = helpCashFlows[index]
    }

    for (let i = 0;i < count;i++) {
      realCashFlows.push(cash)
    }
  })

  return realCashFlows
}

// 转换输入字符串为数值数组
const getCashFlows = (cashFlowsStr: string = '') => {
  let results = [] as number[]
  // 支持中英文逗号和两种换行符作为分割符号
  const regExp = /\n|\r\n|,|，/g

  const strArr = cashFlowsStr.split(regExp)

  for (const str of strArr) {
    if (str) {
      const num = +str
      if (isNaN(num)) {
        message.warning(`请输入正确格式的现金流，以下格式错误--->${str}`)
        return []
      }
      results.push(num)
    }
  }

  return results
}
