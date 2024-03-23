import { message } from 'antd'
import { useLocation, useNavigate } from '@/utils/hooks/router'
import { messageStyle } from './style'

const useAction = (path: string, enable?: boolean) => {
  const navigate = useNavigate()
  const { origin } = useLocation()

  const onClick = () => {
    if (enable) {
      navigate(path)
    } else {
      message.warning({
        content: '该功能暂时不可用, 请试试其它功能吧!',
        duration: 2,
        style: messageStyle,
      })
    }
  }

  return { href: origin + path, onClick }
}

export default useAction
