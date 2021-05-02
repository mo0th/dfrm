import { PublicUser } from '@/types/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { createNanoEvents } from 'nanoevents'
import { useRouter } from 'next/dist/client/router'
import useSWR from 'swr'
import { api } from '@/lib/api-client'

type AuthContext = {
  user: PublicUser | undefined | null
  logout: () => void
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<void>
  ready: boolean
}

enum AuthEvent {
  CLEAR_USER = 'clear_user',
}

const authEmitter = createNanoEvents()

export const clearUser = (): void => {
  authEmitter.emit(AuthEvent.CLEAR_USER)
}

export const AuthContext = createContext<AuthContext>({} as any)

export const AuthProvider: React.FC = ({ children }) => {
  const [ready, setReady] = useState(false)
  const { data, mutate } = useSWR<{ me: PublicUser | null }>('/auth/me')
  const user = data?.me
  const { push } = useRouter()

  useEffect(() => {
    if (data) {
      setReady(true)
    }
  }, [data])

  useEffect(() => {
    const unsub = authEmitter.on(AuthEvent.CLEAR_USER, () => {
      mutate({ me: null }, false)
    })

    return () => {
      unsub()
    }
  }, [mutate])

  const logout = async () => {
    mutate({ me: null }, false)
    await api.post('/auth/logout')
    push('/login')
  }

  const login = async (username: string, password: string): Promise<void> => {
    await api.post('/auth/login', { username, password })
    await mutate()
  }

  const register = async (username: string, password: string): Promise<void> => {
    await api.post('/auth/register', { username, password })
    await mutate()
  }

  return (
    <AuthContext.Provider value={{ user, logout, ready, login, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContext => useContext(AuthContext)
