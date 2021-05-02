import { enforceAuthMiddleware } from '@/lib/auth'
import { createRouter } from '@/lib/router'
import { createForm, getAllUserForms } from '@/lib/forms/service'
import { createFormSchema } from '@/lib/forms/validators'

export default createRouter()
  .use(enforceAuthMiddleware)
  .get(async (req, res) => {
    const userId = req.userId as string

    const forms = await getAllUserForms(userId)

    res.json({ forms })
  })
  .post(async (req, res) => {
    const { name } = await createFormSchema.validate(req.body)

    const formId = await createForm(req.userId as string, name)

    res.json({ formId })
  })
