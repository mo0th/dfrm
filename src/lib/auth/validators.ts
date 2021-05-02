import * as yup from 'yup'

export const loginBodySchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
})

export const registerBodySchema = yup.object({
  username: yup.string().required().min(5).label('Username'),
  password: yup.string().required().min(8).label('Password'),
})
