import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../src/components/common/Navigation';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Add a class to the html element when on the home page
  useEffect(() => {
    if (router.pathname === '/') {
      document.documentElement.classList.add('home-page');
    } else {
      document.documentElement.classList.remove('home-page');
    }
  }, [router.pathname]);

  return (
    <div className={`${inter.className} min-h-screen flex flex-col`}>
      <Head>
        <title>Biblical Guidance Chatbot</title>
        <meta name="description" content="Explore the Bible, learn about biblical characters, and get answers to your spiritual questions" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navigation />
      
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-500">
            &copy; {new Date().getFullYear()} Biblical Chatbot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MyApp;
