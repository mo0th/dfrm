import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

interface SidebarGroupProps {
  title: string
  defaultOpen?: boolean
}

const SidebarGroup: React.FC<SidebarGroupProps> = ({ children, title, defaultOpen = true }) => {
  return (
    <Disclosure defaultOpen={defaultOpen} as="div" className="space-y-3">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center justify-between w-full p-2 text-lg font-bold text-purple-800 transition-colors rounded hover:bg-purple-100 focus:bg-purple-100 focus:outline-none">
            <span>{title}</span>
            <span className="flex items-center justify-center w-5 h-5">
              <ChevronDownIcon
                className={`w-4 h-4 transform transition-transform ${open ? 'rotate-180' : ''}`}
              />
            </span>
          </Disclosure.Button>
          <Disclosure.Panel as="ul" className="space-y-3">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default SidebarGroup
