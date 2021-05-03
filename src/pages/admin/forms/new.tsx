import AdminContent from '@/components/admin/AdminContent'
import AdminWrapper from '@/components/admin/AdminWrapper'

interface NewFormPageProps {}

const NewFormPage: React.FC<NewFormPageProps> = () => {
  return (
    <AdminWrapper>
      <AdminContent title="Create New Form">Create a new form</AdminContent>
    </AdminWrapper>
  )
}

export default NewFormPage
