import { enforceAuthMiddleware } from '@/lib/auth'
import { createRouter } from '@/lib/router'
import { createForm, getAllUserForms } from '@/lib/forms/service'
import { createFormSchema } from '@/lib/forms/validators'
import { splitQueryToArray } from '@/utils/query'

export default createRouter()
  .use(enforceAuthMiddleware)
  .get(async (req, res) => {
    const userId = req.userId as string
    const exclude = splitQueryToArray(req.query.exclude)

    res.json({ forms: await getAllUserForms(userId, exclude) })
  })
  .post(async (req, res) => {
    const { name } = await createFormSchema.validate(req.body)

    const formId = await createForm(req.userId as string, name)

    res.json({ formId })
  })
