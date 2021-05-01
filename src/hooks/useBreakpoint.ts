import debounce from '@/utils/debounce'
import { useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import rawConfig from '../../tailwind.config'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export type Breakpoint = 'base' | 'sm' | 'md' | 'xl' | '2xl'

const twBreakpoints = resolveConfig(rawConfig as any).theme.screens
const breakpoints = Object.entries(twBreakpoints)
  .map(([breakpoint, px]) => [breakpoint, parseInt(px.replace('px', ''))] as [Breakpoint, number])
  .sort(([, px1], [, px2]) => (px2 > px1 ? 1 : -1))

const getCurrentBreakpoint = (): Breakpoint => {
  const w = window.innerWidth
  for (const [breakpoint, px] of breakpoints) {
    if (w >= px) return breakpoint
  }
  return 'base'
}

const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('base')

  useIsomorphicLayoutEffect(() => {
    setBreakpoint(getCurrentBreakpoint())

    const handleResize = debounce(() => {
      setBreakpoint(getCurrentBreakpoint())
    }, 100)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return breakpoint
}

export default useBreakpoint
