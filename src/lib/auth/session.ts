import { SESSION_USERID } from '@/constants'
import { ApiMiddleware, ApiRequest } from '@/types/api'
import session from 'cookie-session'

export const sessionMiddleware: ApiMiddleware = session({
  secret: process.env.SESSION_PASSWORD,
  name: 'dfrm:session',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 15 * 24 * 60 * 60 * 1000,
}) as any

export const setUserIdInSession = (req: ApiRequest, userId: string): void => {
  if (!req.session) {
    req.session = {}
  }
  req.session[SESSION_USERID] = userId
}
