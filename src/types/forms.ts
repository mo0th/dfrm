export enum QuestionType {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  SELECT = 'select',
  MULTISELECT = 'multiselect',
}

export interface Question {
  id: string
  text: string
  type: QuestionType
}

export interface Form {
  id: string
  key?: string
  name: string
  questions: Record<Question['id'], Question>
  questionOrder: Question['id'][]
  published: boolean
  ownerId: string
  description: string
  redirectTo?: string
}

export type FormWithoutSchema = Omit<Form, 'questions'>
