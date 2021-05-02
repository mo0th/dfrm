import { register, setUserIdInSession } from '@/lib/auth'
import { registerBodySchema } from '@/lib/auth/validators'
import { createRouter } from '@/lib/router'

export default createRouter().post(async (req, res) => {
  const { username, password } = await registerBodySchema.validate(req.body)

  const userId = await register(username, password)
  setUserIdInSession(req, userId)

  res.json({ success: true })
})
