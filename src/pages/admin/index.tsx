import AdminContent from '@/components/admin/AdminContent'
import AdminWrapper from '@/components/admin/AdminLayout'

interface AdminHomeProps {}

const AdminHome: React.FC<AdminHomeProps> = () => {
  return (
    <AdminWrapper>
      <AdminContent title="Overview"></AdminContent>
    </AdminWrapper>
  )
}

export default AdminHome
