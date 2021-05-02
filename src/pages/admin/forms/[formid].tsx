import { useRouter } from 'next/router'
import useSWR from 'swr'

import AdminContent from '@/components/admin/AdminContent'
import AdminWrapper from '@/components/admin/AdminLayout'
import { Form } from '@/types/forms'

interface FormDetailsPageProps {}

const FormDetailsPage: React.FC<FormDetailsPageProps> = () => {
  const { query } = useRouter()
  const formId = query.formid as string
  const { data: { form } = {} } = useSWR<{ form: Form }>(`/admin/forms/${formId}`)

  return (
    <AdminWrapper>
      <AdminContent title={form?.name}>Details for form with id: {formId}</AdminContent>
    </AdminWrapper>
  )
}

export default FormDetailsPage
