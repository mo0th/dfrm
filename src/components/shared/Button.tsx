import { ButtonHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

type ButtonClassesObject = Record<'base' | 'disabled' | 'enabled', string>

const common: ButtonClassesObject = {
  base: 'flex items-center font-semibold transition-colors',
  disabled: 'cursor-not-allowed',
  enabled: '',
}

const sizes = {
  sm: 'px-2.5 py-0.5 rounded',
  md: 'px-3.5 py-1.5 rounded',
}

type Variants = 'primary'
const variants: Record<Variants, ButtonClassesObject> = {
  primary: {
    base: 'text-white',
    enabled: 'bg-purple-600 hover:bg-purple-500',
    disabled: 'bg-purple-300',
  },
}

type ButtonProps = {
  size?: keyof typeof sizes
  disabled?: boolean
  variant?: Variants
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'md', className, disabled, variant = 'primary', ...rest }, ref) => {
    const variantClasses = variants[variant]
    const disabledAsString = disabled ? 'disabled' : 'enabled'
    return (
      <button
        className={clsx(
          common.base,
          variantClasses.base,
          sizes[size],
          common[disabledAsString],
          variantClasses[disabledAsString],
          className
        )}
        ref={ref}
        {...rest}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button
