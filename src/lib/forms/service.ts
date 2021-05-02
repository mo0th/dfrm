import { Form, FormWithoutSchema } from '@/types/forms'
import { fetchAll, fetchOne } from '@/utils/deta'
import { omit } from '@/utils/obj'
import { nanoid } from 'nanoid'
import { schemasDb } from './base'

export const getAllUserForms = async (userId: string): Promise<FormWithoutSchema[]> => {
  const forms = await fetchAll<Form>(schemasDb, { ownerId: userId })

  return forms.map(f => omit(f, ['schema']))
}

export const getFormById = async (userId: string, formId: string): Promise<Form | null> => {
  return fetchOne(schemasDb, { ownerId: userId, id: formId })
}

export const createForm = async (userId: string, name: string): Promise<string> => {
  const formId = nanoid()

  const newForm: Form = {
    id: formId,
    schema: [],
    name,
    ownerId: userId,
    published: false,
    description: '',
  }

  await schemasDb.insert(newForm, formId)

  return formId
}
