import clsx from 'clsx'
import Link from 'next/link'
import { AnchorHTMLAttributes, ReactNode } from 'react'

const common = {
  base:
    'flex items-center px-6 py-2 transition-colors rounded hover:text-purple-800 hover:bg-gray-300 focus:bg-gray-300',
}

const variants = {
  default: '',
  outlined: 'border border-gray-500 hover:border-purple-800',
}

type SidebarLinkProps = {
  href: string
  active?: boolean
  icon?: ReactNode
  variant?: keyof typeof variants
} & AnchorHTMLAttributes<HTMLAnchorElement>

const SidebarLink: React.FC<SidebarLinkProps> = ({
  active,
  href,
  children,
  icon,
  variant = 'default',
  ...rest
}) => {
  return (
    <li>
      <Link href={href}>
        <a className={clsx(common.base, variants[variant], active && 'bg-gray-200')} {...rest}>
          {icon}
          <span>{children}</span>
        </a>
      </Link>
    </li>
  )
}

export default SidebarLink
