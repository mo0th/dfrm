import { ExclamationCircleIcon, XIcon } from '@heroicons/react/outline'
import React from 'react'
import { IconComponent } from '../icons'

const variants = {
  error: 'text-red-900 bg-red-200 border-red-500',
}

const variantIcons: Record<keyof typeof variants, IconComponent> = {
  error: ExclamationCircleIcon,
}

interface AlertProps {
  variant: keyof typeof variants
  onClose?: () => void
}

const Alert: React.FC<AlertProps> = ({ variant, children, onClose }) => {
  const Icon = variantIcons[variant]
  return (
    <div className={`flex items-center px-3 py-2 border ${variants[variant]}`}>
      <Icon className="w-4 h-4 mr-2" />
      <div>{children}</div>
      <div className="flex-1" />
      {onClose && (
        <button onClick={() => onClose()}>
          <XIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default Alert
