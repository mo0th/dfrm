import { useUI } from '@/context/UIContext'
import { MouseEventHandler } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import SidebarGroup from './SidebarGroup'
import SidebarLink from './SidebarLink'
import { useRouter } from 'next/dist/client/router'
import useSWR from 'swr'
import { FormWithoutSchema } from '@/types/forms'

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { toggleSidebar } = useUI()

  const { asPath } = useRouter()

  const { data: { forms } = {} } = useSWR<{ forms: FormWithoutSchema[] }>('/admin/forms')

  const handleSidebarClick: MouseEventHandler = event => {
    // Close sidebar is a link was cliked
    const closestLink = (event.target as HTMLElement).closest('a')
    if (closestLink) {
      toggleSidebar(false)
    }
  }

  const formLinks = forms?.map(({ id, name }) => ({ title: name, href: `/admin/forms/${id}` }))

  return (
    <>
      <div onClickCapture={handleSidebarClick} className="h-full p-4 bg-white">
        <nav title="Links" className="space-y-6">
          <SidebarGroup title="General">
            <SidebarLink active={asPath === '/admin'} href="/admin">
              Overview
            </SidebarLink>
            <SidebarLink active={asPath === '/admin/recent'} href="/admin/recent">
              Recent Submissions
            </SidebarLink>
          </SidebarGroup>
          <SidebarGroup title="Forms">
            {/* There are 1+ forms */}
            {formLinks
              ? formLinks.map(({ href, title }) => (
                  <SidebarLink key={href} href={href} active={asPath.startsWith(href)}>
                    {title}
                  </SidebarLink>
                ))
              : null}

            {!formLinks && <>Loading</>}
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
