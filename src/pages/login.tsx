import Alert from '@/components/shared/Alert'
import Button from '@/components/shared/Button'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { FormEventHandler, useEffect, useState } from 'react'

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const { push } = useRouter()
  const { user, login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      push('/admin')
    }
  }, [user, push])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    setLoading(true)
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)
    const username = data.get('username') as string
    const password = data.get('password') as string
    try {
      await login(username, password)
    } catch (err) {
      setError(err.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="w-full max-w-md p-8 bg-gray-200 sm:p-12 sm:px-12 rounded-3xl">
        <h1 className="mb-6 text-4xl font-bold text-purple-800">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {error ? (
            <Alert variant="error" onClose={() => setError('')}>
              {error}
            </Alert>
          ) : null}
          <div className="flex flex-col space-y-2">
            <label htmlFor="username">Username</label>
            <input required type="text" name="username" id="username" autoComplete="username" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <Link href="/register">
              <a className="text-gray-600 hover:text-purple-600">Don&apos;t have an account?</a>
            </Link>
            <Button disabled={loading} type="submit">
              {loading ? 'Loading' : 'Login'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default LoginPage
