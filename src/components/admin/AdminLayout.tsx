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
      <AdminHeader />
      <div className="relative flex flex-row flex-1 w-full h-full max-w-screen-lg mx-auto md:py-4">
        <div
          onClickCapture={() => toggleSidebar(false)}
          className={`md:hidden absolute inset-0 bg-gray-500 duration-75 transition-opacity ${
            sidebarOpen ? 'opacity-75' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute left-0 w-full max-w-[18rem] h-full transform inset-y-0 md:pt-4 transition-transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar />
        </div>
        <main role="main" className="flex-1 min-h-full md:ml-[18rem] p-4">
          {children}
        </main>
      </div>
    </>
  )
}

export default AdminWrapper
