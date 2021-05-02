export type Role = 'owner' | 'admin' | 'user'

export interface User {
  id: string
  key?: string
  email?: string
  username: string
  password: string
  roles: Role[]
}

export type PublicUser = Omit<User, 'password' | 'key'>
