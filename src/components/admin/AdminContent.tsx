import { ReactNode } from 'react'

interface AdminContentProps {
  title: ReactNode
}

const AdminContent: React.FC<AdminContentProps> = ({ title, children }) => {
  return (
    <div className="">
      <h1 className="mb-2 text-4xl font-bold text-purple-800">{title}</h1>
      {children}
    </div>
  )
}

export default AdminContent
