import AdminContent from '@/components/admin/AdminContent'
import AdminWrapper from '@/components/admin/AdminLayout'
import { useRouter } from 'next/dist/client/router'

interface FormDetailsPageProps {}

const FormDetailsPage: React.FC<FormDetailsPageProps> = () => {
  const { query } = useRouter()
  const formId = query.formid as string

  return (
    <AdminWrapper>
      <AdminContent title="Untitled Form">Details for form with id: {formId}</AdminContent>
    </AdminWrapper>
  )
}

export default FormDetailsPage
