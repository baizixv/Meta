import { LinkItem } from '@/typings/data/link'

// 外部链接数据
const TypeLink = {
  Common: 1, // 普通
  Friend: 2, // 友情链接
  Blog: 3, // 博客链接
  GlobalEarth: 4, // 国际
  GovernmentChina: 5, // 中国政府
  TraditionalChina: 6, // 传统文化
}
export const friendLinks: LinkItem[] = [
  {
    key: 'baizixv',
    linkName: '白子诩',
    linkAddress: 'https://baizixv.gitee.io/bookmarks',
    linkType: TypeLink.Friend,
  },
]

export const commonLinks: LinkItem[] = [
  {
    key: '知乎',
    linkName: '知乎',
    linkAddress: 'https://www.zhihu.com/hot',
    linkType: TypeLink.Common,
  },
  {
    key: '掘金',
    linkName: '掘金',
    linkAddress: 'https://juejin.cn/',
    linkType: TypeLink.Common,
  },
  {
    key: 'bilibili',
    linkName: 'B站',
    linkAddress: 'https://www.bilibili.com/',
    linkType: TypeLink.Common,
  },
  {
    key: 'github',
    linkName: 'github',
    linkAddress: 'https://github.com/',
    linkType: TypeLink.Common,
  },
  {
    key: 'MDN',
    linkName: 'MDN',
    linkAddress: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript',
    linkType: TypeLink.Common,
  },
]

export const blogLinks: LinkItem[] = [
  {
    key: 'jizai',
    linkName: '吉仔',
    linkAddress: 'https://jizai.notion.site/',
    linkType: TypeLink.Blog,
  },
  {
    key: 'yinwang',
    linkName: 'BYVoid',
    linkAddress: 'https://www.yinwang.org/',
    linkType: TypeLink.Blog,
  },
  {
    key: 'mxnzp',
    linkName: 'MXNZP',
    linkAddress: 'http://blog.mxnzp.com/',
    linkType: TypeLink.Blog,
  },
]

export const govLinks: LinkItem[] = [
  {
    key: '政府信息公开',
    linkName: '政府信息公开',
    linkAddress: ' https://www.gov.cn/zhengce/xxgk/index.htm',
    linkType: TypeLink.GovernmentChina,
  },
  {
    key: '国家统计数据',
    linkName: '国家统计数据',
    linkAddress: 'https://data.stats.gov.cn/easyquery.htm?cn=C01',
    linkType: TypeLink.GovernmentChina,
  },
]

export const globalEarthLinks: LinkItem[] = [
  {
    key: 'youtube',
    linkName: 'Youtube',
    linkAddress: 'https://www.youtube.com/',
    linkType: TypeLink.Common,
  },
  {
    key: 'wikipedia',
    linkName: '维基百科',
    linkAddress: 'https://wikipedia.org/',
    linkType: TypeLink.Common,
  },
  {
    key: 'Gmail',
    linkName: 'Gmail',
    linkAddress: 'https://mail.google.com/',
    linkType: TypeLink.Common,
  },
]

export const traditionalChinaLinks: LinkItem[] = [
  {
    key: '古诗文网',
    linkName: '古诗文网',
    linkAddress: ' https://www.gushiwen.cn/',
    linkType: TypeLink.Common,
  },
]