import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | Biblical Chatbot</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              404 - Page Not Found
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <div className="mt-6">
              <Link href="/">
                <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Go back home
                </a>
              </Link>
            </div>
            
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-500">Popular Pages</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/bible">
                    <a className="text-base text-blue-600 hover:text-blue-500">
                      Bible Reader <span aria-hidden="true">→</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/characters">
                    <a className="text-base text-blue-600 hover:text-blue-500">
                      Biblical Characters <span aria-hidden="true">→</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/#chat">
                    <a className="text-base text-blue-600 hover:text-blue-500">
                      Chat with AI <span aria-hidden="true">→</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
