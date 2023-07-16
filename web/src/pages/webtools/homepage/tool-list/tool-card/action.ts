import { message } from 'antd'
import { useLocation, useNavigate } from '@/utils/hooks/router'
import { messageStyle } from './style'

const useAction = (path: string, disable?: boolean) => {
  const navigate = useNavigate()
  const { origin } = useLocation()

  const onClick = () => {
    if (disable) {
      message.warning({
        content: '该功能暂时不可用, 请试试其它功能吧!',
        duration: 2,
        style: messageStyle,
      })
    } else {
      navigate(path)
    }
  }

  return { href: origin + path, onClick }
}

export default useAction
