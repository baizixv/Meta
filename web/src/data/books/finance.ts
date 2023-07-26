import { MoneyUnitTypeMap } from '@/typings/configs/common'

export const financeBooks = [
  {
    key: 'finance-1',
    name: '公司理财',
    coverImage: '',
    mainAuthor: '罗斯',
    authors: ['斯蒂芬·A·罗斯', '伦道夫·W·威斯特菲尔德', '...'],
    addTime: '',
    edition: 12,
    studyLevel: 4, // 1-小学水平，2-初中水平，3-高中水平，4-大学水平，5-研究生水平，6-博士水平，7-资深专家水平
    studyType: 2, // 1-通识读物，2-专业知识，3-专业辅助读物
    buyUrl: '', // 购买链接
    buyPrice: 10,
    buyPriceUnit: MoneyUnitTypeMap.CNY,
    readUrl: '', // 在线阅读链接
    knowledgeDomain: '投资学', // 知识领域
    knowledgeArea: '', // 知识细分范围
  },
]
