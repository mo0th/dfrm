import { useEffect, useState } from 'react'

const useOnline = (): boolean => {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    const handler = () => {
      setOnline(window?.navigator ? window.navigator.onLine : true)
    }

    window.addEventListener('online', handler)
    window.addEventListener('offline', handler)

    return () => {
      window.removeEventListener('online', handler)
      window.removeEventListener('offline', handler)
    }
  }, [])

  return online
}

export default useOnline
