import { ApiMiddleware } from '@/types/api'
import { nanoid } from 'nanoid'
import { ApiError } from '@/lib/router'
import { usersDb } from './base'
import { PublicUser, User } from '@/types/auth'
import { verify as argon2Verify, hash as argon2Hash } from 'argon2'
import { fetchOne } from '@/utils/deta'
import { omit } from '@/utils/obj'
import { SESSION_USERID } from '@/constants'

export const checkAuthMiddleware: ApiMiddleware = (req, _res, next) => {
  const userId = req.session?.[SESSION_USERID]
  req.userId = userId
  next()
}

export const enforceAuthMiddleware: ApiMiddleware = (req, _res, next) => {
  if (!req.userId) {
    throw new ApiError(401)
  }
  next()
}

export const getUser = async (userId: string): Promise<User | null> => {
  return (await usersDb.get(userId)) as User | null
}

export const getPublicUser = async (userId: string): Promise<PublicUser | null> => {
  const user = await getUser(userId)

  if (user) return omit(user, ['password', 'key'])

  return user
}

export const login = async (username: string, password: string): Promise<string> => {
  const user = await fetchOne<User>(usersDb, { username })

  if (!user || !(await argon2Verify(user.password, password))) {
    throw new ApiError(406, 'Invalid Login')
  }

  return user.id
}

export const register = async (
  username: string,
  password: string,
  admin?: boolean
): Promise<string> => {
  const existingUser = await fetchOne<User>(usersDb, { username })

  if (existingUser) {
    throw new ApiError(406, 'User already exists')
  }

  const userId = nanoid()

  await usersDb.put<User>(
    {
      id: userId,
      username,
      password: await argon2Hash(password),
      roles: admin ? ['admin', 'user'] : ['user'],
    },
    userId
  )

  return userId
}
