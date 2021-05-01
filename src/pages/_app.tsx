import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/globals.css'
import Header from '@/components/Header'
import { UIContextProvider } from '@/context/UIContext'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <UIContextProvider>
        <Header />
        <Component {...pageProps} />
      </UIContextProvider>
    </>
  )
}

export default MyApp
