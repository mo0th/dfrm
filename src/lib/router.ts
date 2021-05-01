import { ApiRequest, ApiResponse, ApiRouter } from '@/types/api'
import nextConnect from 'next-connect'
import { STATUS_CODES } from 'node:http'
import { sessionMiddleware } from './auth'
import { checkAuthMiddleware } from './auth/service'

export class ApiError extends Error {
  code: number
  constructor(code: number, message: string | undefined = STATUS_CODES[code]) {
    super(message)
    this.code = code
  }
}

export const createRouter = (): ApiRouter =>
  nextConnect<ApiRequest, ApiResponse>({
    onNoMatch: () => {
      throw new ApiError(404)
    },
    onError: (err, _req, res) => {
      if (err instanceof Error) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(err.stack)
        }

        let statusCode = 500

        if (err instanceof ApiError) {
          statusCode = err.code
        }

        res.status(statusCode).json({ message: err.message })
      } else {
        console.log('Non-error value thrown:', err)
        res.status(500).json({ message: 'Non-error value thrown' })
      }
    },
  }).use(sessionMiddleware, checkAuthMiddleware)
