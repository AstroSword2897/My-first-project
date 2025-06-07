import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Biblical Guidance Chatbot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
