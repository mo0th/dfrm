import { ReactNode } from 'react'

interface AdminContentProps {
  title: ReactNode
}

const AdminContent: React.FC<AdminContentProps> = ({ title, children }) => {
  return (
    <div className="">
      <h1 className="mb-2 text-3xl font-bold">{title}</h1>
      {children}
    </div>
  )
}

export default AdminContent
