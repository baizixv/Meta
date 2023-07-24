import React from 'react'
import { Divider, Space, Button } from 'antd'
import { LinkItem } from '@/typings/data/link'

interface SubLinkCardProps {
  linkTitle: string
  linkDatas: LinkItem[]
}

const SubLinkCard: React.FC<SubLinkCardProps> = ({ linkTitle, linkDatas }) => {
  //   const { handleChange } = useAction()
  return (
    <>
      <Divider orientation="left" orientationMargin={0} plain>
        {linkTitle}
      </Divider>
      <Space size={[8, 10]} wrap>
        {linkDatas.map(({ key, linkName, linkAddress }) => (
          <Button key={key} size="middle" href={linkAddress} target="_blank">
            {linkName}
          </Button>
        ))}
      </Space>
    </>
  )
}

export default SubLinkCard
