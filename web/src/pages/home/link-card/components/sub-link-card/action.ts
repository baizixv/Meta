const useAction = () => {
  const handleChange = (linkAddress: string) => {
    // 判断是web环境下, 进行跳转
    if (window?.open) {
      window.open(linkAddress, '_blank')
    }
  }

  return { handleChange }
}

export default useAction
