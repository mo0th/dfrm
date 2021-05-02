import { SESSION_USERID } from '@/constants'
import { NextApiRequest, NextApiResponse } from 'next'
import { Middleware as NCMiddleware, NextConnect, RequestHandler } from 'next-connect'

export type ApiRequest = NextApiRequest & {
  session?: {
    [SESSION_USERID]?: string
  } | null
  userId?: string
}
export type ApiResponse = NextApiResponse
export type ApiRouter = NextConnect<ApiRequest, ApiResponse>
export type ApiHandler = RequestHandler<ApiRequest, ApiResponse>

export type ApiMiddleware = NCMiddleware<ApiRequest, ApiResponse>
