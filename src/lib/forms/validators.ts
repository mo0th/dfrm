import * as yup from 'yup'

export const createFormSchema = yup.object({
  name: yup.string().default('New Untitled Form').min(1),
})
