import AdminContent from '@/components/admin/AdminContent'
import AdminLayout from '@/components/admin/AdminLayout'

interface AdminHomeProps {}

const AdminHome: React.FC<AdminHomeProps> = () => {
  return (
    <AdminLayout>
      <AdminContent title="Overview"></AdminContent>
    </AdminLayout>
  )
}

export default AdminHome
