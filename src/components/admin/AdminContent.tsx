import { ReactNode } from 'react'
import Spinner from '../shared/Spinner'

interface AdminContentProps {
  title: ReactNode
  loading?: boolean
}

const AdminContent: React.FC<AdminContentProps> = ({ title, children, loading }) => {
  return loading ? (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-6 text-purple-800">
      <Spinner size="lg" />
      <div className="text-2xl font-semibold">Loading</div>
    </div>
  ) : (
    <div className="">
      <h1 className="mb-2 text-4xl font-bold text-purple-800">{title}</h1>
      {children}
    </div>
  )
}

export default AdminContent
