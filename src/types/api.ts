import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-iron-session'
import { Middleware as NCMiddleware, NextConnect, RequestHandler } from 'next-connect'

export type ApiRequest = NextApiRequest & {
  session: Session
  userId: string | null
}
export type ApiResponse = NextApiResponse
export type ApiRouter = NextConnect<ApiRequest, ApiResponse>
export type ApiHandler = RequestHandler<ApiRequest, ApiResponse>

export type ApiMiddleware = NCMiddleware<ApiRequest, ApiResponse>
