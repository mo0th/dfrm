import AdminContent from '@/components/admin/AdminContent'
import AdminLayout from '@/components/admin/AdminLayout'

interface NewFormPageProps {}

const NewFormPage: React.FC<NewFormPageProps> = () => {
  return (
    <AdminLayout>
      <AdminContent title="Create New Form">Create a new form</AdminContent>
    </AdminLayout>
  )
}

export default NewFormPage
