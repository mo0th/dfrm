import { ApiMiddleware } from '@/types/api'
import { ApiError } from '../router'

export const checkAuthMiddleware: ApiMiddleware = (req, _res, next) => {
  const userId = req.session.get<string>('userId') ?? null
  req.userId = userId
  next()
}

export const enforceAuthMiddleware: ApiMiddleware = (req, _res, next) => {
  if (!req.userId) {
    throw new ApiError(401)
  }
  next()
}
