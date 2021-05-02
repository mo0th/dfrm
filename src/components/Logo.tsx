const logoSizes = {
  small: 'text-3xl',
  medium: 'text-5xl',
  large: 'text-7xl',
}

interface LogoProps {
  open?: boolean
  size: keyof typeof logoSizes
}

const letterCommon =
  'inset-0 flex items-center justify-center absolute w-8 h-8 transform transition-transform'

const Logo: React.FC<LogoProps> = ({ open = true, size }) => {
  const letterScale = open ? 'scale-100' : 'scale-50'
  return (
    <div className={`relative ${logoSizes[size]} ${open ? 'w-32' : 'w-8'} h-8 font-mono font-bold`}>
      <div
        className={`${letterCommon} ${letterScale} ${
          open ? 'translate-x-0' : '-translate-x-2 -translate-y-2'
        }`}
      >
        D
      </div>
      <div
        className={`${letterCommon} ${letterScale} ${
          open ? 'translate-x-8' : 'translate-x-2 -translate-y-2'
        }`}
      >
        F
      </div>
      <div
        className={`${letterCommon} ${letterScale} ${
          open ? 'translate-x-16' : '-translate-x-2 translate-y-2'
        }`}
      >
        R
      </div>
      <div
        className={`${letterCommon} ${letterScale} ${
          open ? 'translate-x-24' : 'translate-x-2 translate-y-2'
        }`}
      >
        M
      </div>
    </div>
  )
}

export default Logo

export const StaticLogo: React.FC<Omit<LogoProps, 'open'>> = ({ size }) => {
  return (
    <div className={`relative ${logoSizes[size]} w-64 h-8 font-mono font-bold`}>
      <div className={letterCommon}>D</div>
      <div className={letterCommon}>F</div>
      <div className={letterCommon}>R</div>
      <div className={letterCommon}>M</div>
    </div>
  )
}
