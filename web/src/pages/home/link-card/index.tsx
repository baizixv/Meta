import React from 'react'
import { Card } from 'antd'
import { bodyStyle, contentStyle, headStyle } from './style'
import {
  blogLinks,
  commonLinks,
  friendLinks,
  globalEarthLinks,
  govLinks,
  traditionalChinaLinks,
} from '@/data/link'
import SubLinkCard from './components/sub-link-card'

const LinkCard: React.FC = () => {
  return (
    <Card
      title="外部链接"
      // extra={<a href="#">详细信息</a>}
      bordered={false}
      style={contentStyle}
      headStyle={headStyle}
      bodyStyle={bodyStyle}
    >
      <SubLinkCard linkTitle="友情链接" linkDatas={friendLinks} />
      <SubLinkCard linkTitle="常用链接" linkDatas={commonLinks} />
      <SubLinkCard linkTitle="博客集合" linkDatas={blogLinks} />
      <SubLinkCard linkTitle="政府信息" linkDatas={govLinks} />
      <SubLinkCard linkTitle="全球信息" linkDatas={globalEarthLinks} />
      <SubLinkCard linkTitle="传统文化" linkDatas={traditionalChinaLinks} />
    </Card>
  )
}

export default LinkCard
