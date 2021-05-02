import { login, setUserIdInSession } from '@/lib/auth'
import { loginBodySchema } from '@/lib/auth/validators'
import { createRouter } from '@/lib/router'

export default createRouter().post(async (req, res) => {
  const { username, password } = await loginBodySchema.validate(req.body)

  const userId = await login(username, password)
  setUserIdInSession(req, userId)

  res.json({ success: true })
  console.log(res.headersSent, res.getHeaders())
})
