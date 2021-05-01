import AdminContent from '@/components/admin/AdminContent'
import AdminLayout from '@/components/admin/AdminLayout'
import { useRouter } from 'next/dist/client/router'

interface FormDetailsPageProps {}

const FormDetailsPage: React.FC<FormDetailsPageProps> = () => {
  const { query } = useRouter()
  const formId = query.formid as string

  return (
    <AdminLayout>
      <AdminContent title="Untitled Form">Details for form with id: {formId}</AdminContent>
    </AdminLayout>
  )
}

export default FormDetailsPage
