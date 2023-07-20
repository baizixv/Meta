import { PaymentTypeEnum } from '../common'

// 财务计算工具，借贷利率计算，还款方式
export const PaymentType: Record<PaymentTypeEnum, string> = {
  Annuity: 'Annuity', // 等额本息
  Linear: 'Linear', // 等额本金
}
