import Head from 'next/head';
import Link from 'next/link';

export default function VerifyRequest() {
  return (
    <>
      <Head>
        <title>Check your email - Biblical Chatbot</title>
        <meta name="description" content="Check your email for the sign-in link" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="mx-auto h-12 w-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-800">
              Check your email
            </h2>
            <p className="mt-2 text-center text-sm text-orange-600">
              A sign-in link has been sent to your email address
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 text-orange-400 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-lg font-medium text-orange-800 mb-2">
                Sign-in link sent!
              </h3>
              
              <p className="text-orange-600 mb-6">
                We've sent a secure sign-in link to your email address. Click the link in the email to sign in to your account.
              </p>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-orange-800 mb-2">Can't find the email?</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Check your spam or junk folder</li>
                  <li>• Make sure you entered the correct email address</li>
                  <li>• Wait a few minutes for the email to arrive</li>
                </ul>
              </div>

              <Link
                href="/auth/signin"
                className="inline-flex items-center px-4 py-2 border border-orange-300 text-sm font-medium rounded-lg text-orange-700 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 