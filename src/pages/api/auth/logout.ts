import { createRouter } from '@/lib/router'

export default createRouter().post((req, res) => {
  req.session = null
  res.send({ success: true })
})
