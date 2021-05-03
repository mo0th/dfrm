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
    if (!user && authReady) {
      replace(`/login?next=${encodeURIComponent(asPath)}`)
    }
  }, [user, replace, asPath, authReady])

  return (
    <>
      <div className="flex flex-col h-full min-h-screen">
        <AdminHeader />

        <div className="relative flex flex-row flex-1 w-full h-full max-w-screen-lg py-4 mx-auto md:py-8">
          <div
            onClickCapture={() => toggleSidebar(false)}
            className={`md:hidden absolute inset-0 bg-gray-500 duration-75 motion-safe:transition-opacity ${
              sidebarOpen ? 'opacity-75' : 'opacity-0'
            }`}
          />
          <div
            className={`absolute z-10 left-0 w-full max-w-[18rem] h-screen transform inset-y-0 md:pt-4 motion-safe:transition-transform overflow-y-auto ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <Sidebar />
          </div>
          <main role="main" className="flex-1 md:ml-[18rem] p-4 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminWrapper
