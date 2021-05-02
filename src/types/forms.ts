export interface Form {
  id: string
  key?: string
  name: string
  schema: Record<string, any>[]
  published: boolean
  ownerId: string
  description: string
  redirectTo?: string
}

export type FormWithoutSchema = Omit<Form, 'schema'>
