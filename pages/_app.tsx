import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { GeistProvider } from "@geist-ui/core"
import "inter-ui/inter.css"
import "../style/styles.css"
import "../style/next-auth.scss"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Votex</title>
        <meta name="description" content="A voting app for universities" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <GeistProvider>
        <Component {...pageProps} />
      </GeistProvider>
    </SessionProvider>
  )
}
