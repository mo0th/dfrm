import { useAuth } from '@/context/AuthContext'
import { useUI } from '@/context/UIContext'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import AdminHeader from './AdminHeader'
import Sidebar from './sidebar/Sidebar'

interface MainLayoutProps {}

const AdminWrapper: React.FC<MainLayoutProps> = ({ children }) => {
  const { sidebarOpen, toggleSidebar } = useUI()
  const { user, ready: authReady } = useAuth()
  const { replace, asPath } = useRouter()

  useEffect(() => {
    if (authReady && !user) {
      replace(`/login?next=${encodeURIComponent(asPath)}`)
    }
  }, [user, replace, asPath, authReady])

  return (
    <>
      <div className="flex flex-col h-screen">
        <AdminHeader />

        <div className="relative flex flex-row flex-1 w-full h-full max-w-screen-lg mx-auto overflow-y-auto">
          <div
            onClickCapture={() => toggleSidebar(false)}
            className={`md:hidden fixed inset-0 bg-gray-500 duration-75 motion-safe:transition-opacity ${
              sidebarOpen ? 'opacity-75' : 'opacity-0'
            }`}
          />

          <div
            className={`fixed inset-y-0 md:inset-auto py-16 bg-white md:py-4 md:sticky z-10 left-0 w-full max-w-[18rem] transform top-0 motion-safe:transition-transform overflow-y-auto ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <Sidebar />
          </div>

          <div className="w-full p-4">
            <main role="main" className="my-4 mb-16">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminWrapper
