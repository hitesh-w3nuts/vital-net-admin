import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link 
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className='sidebar-mini'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
