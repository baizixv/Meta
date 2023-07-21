import { fixed2 } from '@/utils/format/number'
export const useAction = (debtAccuracy: number) => {
  const formatter = (value: number | undefined, _: any) => {
    if (value) {
      const showValue = +value * 100
      return `${+fixed2(showValue, debtAccuracy + 2)}`
    }
    return ''
  }

  const parser = (strV: string | undefined): any => {
    if (strV) {
      const realValue = +strV / 100
      return +fixed2(realValue, debtAccuracy + 2)
    }
  }
  return { formatter, parser }
}
