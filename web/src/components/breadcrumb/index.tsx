import React from 'react'
import { Breadcrumb as BreadcrumbComp } from 'antd'
import { Link } from 'react-router-dom'
import { useAction } from './action'

const Breadcrumb: React.FC<{
  breadcrumbNameMap: Record<string, string>
}> = ({ breadcrumbNameMap }) => {
  const { breadcrumbItems } = useAction()

  return (
    <BreadcrumbComp
      separator=">"
      items={breadcrumbItems.map(url => ({
        key: url,
        title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
      }))}
    />
  )
}

export default Breadcrumb
