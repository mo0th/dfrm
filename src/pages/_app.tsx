import Head from 'next/head'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

import { UIContextProvider } from '@/context/UIContext'
import { AuthProvider } from '@/context/AuthContext'
import { swrFetcher } from '@/lib/api-client'

import '../styles/globals.css'
import '../styles/forms.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <SWRConfig value={{ fetcher: swrFetcher }}>
        <AuthProvider>
          <UIContextProvider>
            <Component {...pageProps} />
          </UIContextProvider>
        </AuthProvider>
      </SWRConfig>
    </>
  )
}

export default MyApp
