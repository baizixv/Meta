import { pathNameMap } from '@/configs/webtools.config'
import { useLocation } from './router'

export const useWebTitle = () => {
  const location = useLocation()
  const pathname = location.pathname || '/'

  const webTitle = pathNameMap[pathname]
    ? `${pathNameMap[pathname]}-Baizixv.com`
    : 'Baizixv.com'

  if (document) {
    document.title = webTitle
  }
}
