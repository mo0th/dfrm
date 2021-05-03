import { useRouter } from 'next/router'
import useSWR from 'swr'

import AdminContent from '@/components/admin/AdminContent'
import AdminWrapper from '@/components/admin/AdminWrapper'
import { Form } from '@/types/forms'
import { ApiError } from 'next/dist/next-server/server/api-utils'

interface FormDetailsPageProps {}

const FormDetailsPage: React.FC<FormDetailsPageProps> = () => {
  const { query } = useRouter()
  const formId = query.formid as string
  const { data: { form } = {}, error } = useSWR<{ form: Form }, ApiError>(
    formId && `/admin/forms/${formId}`
  )

  return (
    <AdminWrapper>
      <AdminContent
        loading={!form && !error}
        title={
          error ? (
            error.message
          ) : (
            <>
              <span>{form?.name}</span>
            </>
          )
        }
      >
        {error ? (
          <div className="my-8 text-xl">
            A form with id <code>{formId}</code> does not exist. Select a form from the sidebar or
            create a new one.
          </div>
        ) : (
          <div>
            <p className="italic text-gray-600">id: {formId}</p>
          </div>
        )}
      </AdminContent>
    </AdminWrapper>
  )
}

export default FormDetailsPage
