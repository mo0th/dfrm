import { useUI } from '@/context/UIContext'
import { MouseEventHandler } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import SidebarGroup from './SidebarGroup'
import SidebarLink from './SidebarLink'
import { useRouter } from 'next/dist/client/router'
import useSWR from 'swr'
import { FormWithoutSchema } from '@/types/forms'
import { api } from '@/lib/api-client'
import Spinner from '@/components/shared/Spinner'

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { toggleSidebar } = useUI()

  const { asPath, push } = useRouter()

  const { data: { forms } = {}, revalidate } = useSWR<{ forms: FormWithoutSchema[] }>(
    '/admin/forms'
  )

  const handleSidebarClick: MouseEventHandler = event => {
    // Close sidebar is a link was cliked
    const closestLink = (event.target as HTMLElement).closest('a')
    if (closestLink) {
      toggleSidebar(false)
    }
  }

  const handleCreateForm: MouseEventHandler = async event => {
    event.preventDefault()
    const { data } = await api.post<{ formId: string }>('/admin/forms', { name: 'New Form' })
    revalidate()
    push(`/admin/forms/${data.formId}`)
  }

  const formLinks = forms?.map(({ id, name }) => ({ title: name, href: `/admin/forms/${id}` }))

  return (
    <>
      <div
        onClickCapture={handleSidebarClick}
        className="h-full p-4 overflow-y-auto bg-white md:py-8"
      >
        <nav className="space-y-6">
          <SidebarGroup title="General">
            <SidebarLink active={asPath === '/admin'} href="/admin">
              Overview
            </SidebarLink>
            {/* <SidebarLink active={asPath === '/admin/recent'} href="/admin/recent">
              Recent Submissions
            </SidebarLink> */}
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

            {!formLinks && (
              <div className="flex items-center justify-center p-2 text-purple-800">
                <Spinner size="sm" />
              </div>
            )}
            <SidebarLink
              onClick={handleCreateForm}
              href="/admin/forms/new"
              variant="outlined"
              icon={<PlusIcon className="w-5 h-5 mr-2" />}
            >
              Create New Form
            </SidebarLink>
          </SidebarGroup>
          {false && (
            <SidebarGroup title="Manage">
              <SidebarLink href="/admin">Settings</SidebarLink>
              <SidebarLink href="/admin">Users</SidebarLink>
            </SidebarGroup>
          )}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
