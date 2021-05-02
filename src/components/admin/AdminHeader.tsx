import { useUI } from '@/context/UIContext'
import { Menu, Transition } from '@headlessui/react'
import Container from '../Container'
import { UserIcon } from '@heroicons/react/solid'
import { useAuth } from '@/context/AuthContext'
import { LogoutIcon } from '@heroicons/react/outline'
import { GithubIconOutlined } from '../icons'
import Logo from '../Logo'
import Button from '../shared/Button'

interface HeaderProps {}

const menuCommon =
  'absolute h-[2px] inset-x-1 rounded-3xl bg-current transform transition-transform'

const AdminHeader: React.FC<HeaderProps> = () => {
  const { sidebarOpen, toggleSidebar } = useUI()
  const { user, logout } = useAuth()

  return (
    <header className="relative z-20 bg-gray-200">
      <Container>
        <div className="flex flex-row items-center justify-between p-4 text-purple-800 lg:py-6">
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
            <Logo size="small" open={sidebarOpen} />
          </div>
          <div className="flex items-center space-x-4">
            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <Menu.Button as={Button} className="h-7" size="sm">
                    <UserIcon className="w-4 h-4 sm:mr-1" />
                    <span className="sr-only focus:not-sr-only sm:not-sr-only">
                      {user?.username}
                    </span>
                  </Menu.Button>
                  <Transition
                    show={open}
                    enter="transition"
                    enterFrom="opacity-0"
                    enterTo="opacity-1"
                    leave="transition-all"
                    leaveFrom="opacity-1"
                    leaveTo="opacity-0"
                  >
                    <Menu.Items
                      static
                      className="absolute right-0 w-48 p-1 mt-2 space-y-2 origin-top-right bg-white rounded shadow-lg"
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => logout()}
                            className={`w-full inline-flex items-center text-left px-2 p-1 transition-colors ${
                              active ? 'bg-gray-300' : ''
                            }`}
                          >
                            <LogoutIcon className="w-4 h-4 mr-2" />
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`w-full inline-flex items-center text-left px-2 p-1 transition-colors ${
                              active ? 'bg-gray-300' : ''
                            }`}
                            target="_blank"
                            href="https://github.com/mo0th/dfrm"
                            rel="noopener noreferrer"
                          >
                            <GithubIconOutlined className="w-4 h-4 mr-2" />
                            Source
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default AdminHeader
