import React from 'react'
import { Card } from 'antd'
import { bodyStyle, contentStyle, headStyle } from './style'
import { blogLinks, commonLinks, friendLinks } from '@/data/link'
import SubLinkCard from './components/sub-link-card'

const LinkCard: React.FC = () => {
  return (
    <Card
      title="外部链接"
      bordered={false}
      style={contentStyle}
      headStyle={headStyle}
      bodyStyle={bodyStyle}
    >
      <SubLinkCard linkTitle="常用链接" linkDatas={commonLinks} />
      <SubLinkCard linkTitle="博客链接" linkDatas={blogLinks} />
      <SubLinkCard linkTitle="友情链接" linkDatas={friendLinks} />
    </Card>
  )
}

export default LinkCard
