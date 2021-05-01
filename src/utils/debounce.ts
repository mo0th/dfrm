const debounce = <T extends CallableFunction>(fn: T, delay: number): T => {
  let timer: ReturnType<typeof setTimeout>

  return ((...args: any[]) => {
    if (timer) clearTimeout(timer)
    setTimeout(() => {
      fn(...args)
    }, delay)
  }) as any
}

export default debounce
