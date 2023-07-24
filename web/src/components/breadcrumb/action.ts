import { useLocation } from '@/utils/hooks/router'

export const useAction = () => {
  const { pathname } = useLocation()
  const pathSnippets = (pathname as string).split('/').filter((i: string) => i)
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return url
  })
  return { breadcrumbItems }
}
