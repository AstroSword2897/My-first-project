import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function AuthError() {
  const router = useRouter();
  const { error } = router.query;

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'Configuration':
        return 'There is a problem with the server configuration. Please contact support.';
      case 'AccessDenied':
        return 'You do not have permission to sign in.';
      case 'Verification':
        return 'The sign-in link is no longer valid. Please request a new one.';
      case 'Default':
      default:
        return 'An error occurred during sign in. Please try again.';
    }
  };

  const getErrorTitle = (errorCode: string) => {
    switch (errorCode) {
      case 'Configuration':
        return 'Configuration Error';
      case 'AccessDenied':
        return 'Access Denied';
      case 'Verification':
        return 'Invalid Link';
      case 'Default':
      default:
        return 'Sign In Error';
    }
  };

  const errorMessage = typeof error === 'string' ? getErrorMessage(error) : 'An error occurred during sign in.';
  const errorTitle = typeof error === 'string' ? getErrorTitle(error) : 'Sign In Error';

  return (
    <>
      <Head>
        <title>{errorTitle} - Biblical Chatbot</title>
        <meta name="description" content="Authentication error" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="mx-auto h-12 w-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-800">
              {errorTitle}
            </h2>
            <p className="mt-2 text-center text-sm text-orange-600">
              We encountered an issue with your sign-in attempt
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 text-red-400 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-lg font-medium text-orange-800 mb-2">
                {errorTitle}
              </h3>
              
              <p className="text-orange-600 mb-6">
                {errorMessage}
              </p>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-orange-800 mb-2">What you can do:</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Try signing in again</li>
                  <li>• Check your internet connection</li>
                  <li>• Clear your browser cache and cookies</li>
                  <li>• Try a different browser</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  href="/auth/signin"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
                >
                  Try Again
                </Link>

                <Link
                  href="/"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-orange-300 text-sm font-medium rounded-lg text-orange-700 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                >
                  Go to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 