import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

const common = {
  base:
    'flex items-center px-3 py-2 transition-colors rounded hover:text-purple-800 hover:bg-gray-300 focus:bg-gray-300',
}

const variants = {
  default: '',
  outlined: 'border border-gray-500',
}

interface SidebarLinkProps {
  href: string
  active?: boolean
  icon?: ReactNode
  variant?: keyof typeof variants
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  active,
  href,
  children,
  icon,
  variant = 'default',
}) => {
  return (
    <Link href={href}>
      <a className={clsx(common.base, variants[variant], active && 'bg-gray-200')}>
        {icon}
        <span>{children}</span>
      </a>
    </Link>
  )
}

export default SidebarLink
