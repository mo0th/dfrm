const sizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-10 h-10',
}

interface SpinnerProps {
  size: keyof typeof sizes
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
  return (
    <svg
      className={`w-5 h-5 text-current animate-spin ${sizes[size]}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export default Spinner
