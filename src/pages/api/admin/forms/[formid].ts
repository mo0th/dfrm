import { getFormById } from '@/lib/forms/service'
import { createRouter } from '@/lib/router'
import { ApiError } from '@/lib/router'

export default createRouter().get(async (req, res) => {
  const userId = req.userId as string
  const formId = req.query.formid

  if (typeof formId !== 'string') {
    throw new ApiError(404, 'Form Not Found')
  }

  const form = await getFormById(userId, formId)

  if (!form) {
    throw new ApiError(404, 'Form Not Found')
  }

  res.json({ form })
})
