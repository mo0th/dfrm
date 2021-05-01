import useBreakpoint, { Breakpoint } from '@/hooks/useBreakpoint'
import {
  createContext,
  Reducer,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react'

type TUIContext = {
  sidebarOpen: boolean
  toggleSidebar: (val?: boolean) => void
}

export const UIContext = createContext<TUIContext>({} as any)

export const AUTO_HIDE_SIDEBAR_BREAKPOINTS: Set<Breakpoint> = new Set(['base', 'sm'])

export const UIContextProvider: React.FC = ({ children }) => {
  const breakpoint = useBreakpoint()

  const sidebarManuallyOpened = useRef(false)
  const [sidebarOpen, _toggleSidebar] = useReducer<
    Reducer<boolean, Partial<{ nextOpen: boolean; manual: boolean }>>
  >((open: boolean, { nextOpen, manual }) => {
    if (!AUTO_HIDE_SIDEBAR_BREAKPOINTS.has(breakpoint)) {
      return true
    }

    const result = typeof nextOpen === 'boolean' ? nextOpen : !open

    if (manual) {
      sidebarManuallyOpened.current = result
    }

    return result
  }, false)

  const toggleSidebar = useCallback((nextOpen?: boolean) => {
    _toggleSidebar({ nextOpen: nextOpen, manual: true })
  }, [])

  useEffect(() => {
    if (AUTO_HIDE_SIDEBAR_BREAKPOINTS.has(breakpoint)) {
      // Handle 'proper' opening & closing when sidebar
      if (!sidebarManuallyOpened.current) _toggleSidebar({ nextOpen: false })
    } else {
      // Show the sidebar at md+ breakpoints
      _toggleSidebar({ nextOpen: true })
    }
  }, [breakpoint])

  return <UIContext.Provider value={{ sidebarOpen, toggleSidebar }}>{children}</UIContext.Provider>
}

export const useUI = (): TUIContext => useContext(UIContext)
