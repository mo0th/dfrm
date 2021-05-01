import { useUI } from '@/context/UIContext'
import { MouseEventHandler } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import SidebarGroup from './SidebarGroup'
import SidebarLink from './SidebarLink'
import { useRouter } from 'next/dist/client/router'

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { toggleSidebar } = useUI()

  const { asPath } = useRouter()

  const handleSidebarClick: MouseEventHandler = event => {
    // Close sidebar is a link was cliked
    const closestLink = (event.target as HTMLElement).closest('a')
    if (closestLink) {
      toggleSidebar(false)
    }
  }

  const formLinks = [
    { href: '/admin/forms/c_234', title: 'Untitled Form' },
    { href: '/admin/forms/form-2341', title: 'Untitled Form' },
  ]

  return (
    <>
      <div onClickCapture={handleSidebarClick} className="h-full p-4 bg-white">
        <nav title="Links" className="space-y-6">
          <SidebarGroup title="General">
            <SidebarLink active={asPath === '/admin'} href="/admin">
              Overview
            </SidebarLink>
          </SidebarGroup>
          <SidebarGroup title="Forms">
            {formLinks.map(({ href, title }) => (
              <SidebarLink key={href} href={href} active={asPath.startsWith(href)}>
                {title}
              </SidebarLink>
            ))}
            <SidebarLink
              href="/admin/forms/new"
              variant="outlined"
              icon={<PlusIcon className="w-5 h-5 mr-2" />}
            >
              Create New Form
            </SidebarLink>
          </SidebarGroup>
          <SidebarGroup title="Manage">
            <SidebarLink href="/admin">Settings</SidebarLink>
            <SidebarLink href="/admin">Users</SidebarLink>
          </SidebarGroup>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
