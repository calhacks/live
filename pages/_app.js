import '../css/styles.css';
import '../css/globals.css';
import '../css/colors.scss';
import '../css/constants.scss';
import '../css/faq.scss';
import '../css/header.scss';
import '../css/home.scss';
import '../css/map.scss';
import '../css/prizes.scss';
import '../css/resources.scss';
import '../css/styles.css';
import '../css/styles.scss';
import '../css/tags.scss';
import Banner from '../components/Banner';
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="shortcut icon" href="https://calhacks-sierra.s3.us-west-2.amazonaws.com/assets/live/bigbear.svg" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600&display=swap"
        rel="stylesheet" />
    </Head>
    <Banner />
    <Component {...pageProps} />
  </>
}