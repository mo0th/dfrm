import { ApiMiddleware } from '@/types/api'
import { Handler, ironSession, SessionOptions, withIronSession } from 'next-iron-session'

const sessionOptions: SessionOptions = {
  cookieName: 'dfrm:session',
  password: process.env.SESSION_PASSWORD,
  ttl: 15 * 24 * 60 * 60,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export const sessionMiddleware: ApiMiddleware = ironSession(sessionOptions)
export const withSession = (handler: Handler): Handler => withIronSession(handler, sessionOptions)
