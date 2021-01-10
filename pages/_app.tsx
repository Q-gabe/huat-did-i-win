import '../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (<>
        <Head>
            <title>Huat Did I Win?</title>
            <link rel="icon" href="/favicon.ico" />
            <link
                rel="preload"
                href="/fonts/mplus-1mn-light.ttf"
                as="font"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/mplus-1mn-bold.ttf"
                as="font"
                crossOrigin=""
            />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
        </Head>
        <div className="card ticket mt-2">
            <div className="card-body">
                <Component {...pageProps} />
            </div>
            <img id="barcode" className="barcode" src="barcode.png"/>
        </div>
        <footer className="footer text-center mt-3 mb-2">
            Made by <a href="https://github.com/Q-gabe">Team Silverhand (@Q-gabe)</a>.
        </footer>
      </>
    )
}

export default MyApp
