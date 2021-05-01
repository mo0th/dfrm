import { useUI } from '@/context/UIContext'
import Container from './Container'

interface HeaderProps {}

const letterCommon =
  'inset-0 flex items-center justify-center absolute w-8 h-8 transform transition-transform'

const menuCommon =
  'absolute h-[2px] inset-x-1 rounded-3xl bg-current transform transition-transform'

const Header: React.FC<HeaderProps> = () => {
  const { sidebarOpen, toggleSidebar } = useUI()
  const letterScale = sidebarOpen ? 'scale-100' : 'scale-50'

  return (
    <header className="relative z-20 bg-gray-200">
      <Container>
        <div className="flex flex-row items-center justify-between p-4 lg:py-6">
          <div className="flex">
            <button
              onClick={() => toggleSidebar()}
              className="relative w-8 h-8 mr-1 md:hidden focus:outline-none"
            >
              <div className={`${menuCommon} ${sidebarOpen ? 'scale-0' : ''} top-2`} />
              <div
                className={`${menuCommon} ${
                  sidebarOpen ? 'rotate-45' : ''
                } top-1/2 -translate-y-1/2`}
              />
              <div
                className={`${menuCommon} ${
                  sidebarOpen ? 'rotate-[315deg] duration-150' : 'duration-75'
                } top-1/2 -translate-y-1/2`}
              />
              <div className={`${menuCommon} ${sidebarOpen ? 'scale-0' : ''} bottom-2`} />
            </button>
            <div
              className={`relative text-3xl ${
                sidebarOpen ? 'w-32' : 'w-8'
              } h-8 font-mono font-bold`}
            >
              <div
                className={`${letterCommon} ${letterScale} ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-2 -translate-y-2'
                }`}
              >
                D
              </div>
              <div
                className={`${letterCommon} ${letterScale} ${
                  sidebarOpen ? 'translate-x-8' : 'translate-x-2 -translate-y-2'
                }`}
              >
                F
              </div>
              <div
                className={`${letterCommon} ${letterScale} ${
                  sidebarOpen ? 'translate-x-16' : '-translate-x-2 translate-y-2'
                }`}
              >
                R
              </div>
              <div
                className={`${letterCommon} ${letterScale} ${
                  sidebarOpen ? 'translate-x-24' : 'translate-x-2 translate-y-2'
                }`}
              >
                M
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <a
              href="https://github.com/mo0th/dfrm"
              rel="noreferrer noopener"
              target="_blank"
              className="hover:underline"
            >
              Source
            </a>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
