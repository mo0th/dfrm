import { clearUser } from '@/context/AuthContext'
import redaxios from 'redaxios'

export const api: typeof redaxios = redaxios.create({ baseURL: '/api' })

export const swrFetcher = <Response>(url: string): Promise<Response> =>
  api
    .get<Response>(url)
    .then(response => response.data)
    .catch(error => {
      if (error.status === 401) {
        clearUser()
      }
      return Promise.reject(error.data)
    }) as Promise<Response>
