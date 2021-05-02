import { getPublicUser } from '@/lib/auth'
import { createRouter } from '@/lib/router'

export default createRouter().get(async (req, res) => {
  let user = null

  if (req.userId) {
    user = await getPublicUser(req.userId)
  }

  res.json({ me: user })
})
