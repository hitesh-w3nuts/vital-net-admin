import '@/styles/globals.css'
import '@/styles/OverlayScrollbars.min.css'
import '@/styles/adminlte.min.css'
import Head from "next/head";
import DefaultLayout from "../components/Layout/DefaultLayout";
function MyApp({ Component, pageProps }) {

  if (Component.getLayout) {
		return Component.getLayout(
			<>
				<Component {...pageProps} />
			</>
		);
	}

  return (
    <>
      <Head>
        <title>Vital Net Admin</title>
        <meta name="description" content="Generated by create next app" />
        {/* <link src="/assets/css/OverlayScrollbars.min.css"/> */}
      </Head>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </>

  )
}

export default MyApp;