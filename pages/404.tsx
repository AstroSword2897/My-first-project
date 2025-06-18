import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Home, BookOpen, Users, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | Biblical Chatbot</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
            <div className="text-center">
              {/* Enhanced 404 Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-xl opacity-30"></div>
                  <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-red-500 to-pink-500 shadow-2xl">
                    <ExclamationTriangleIcon className="h-10 w-10 text-white" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* Enhanced Error Message */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  404 - Page Not Found
                </h2>
                <p className="text-xl text-white/80 mb-6">
                  Sorry, we couldn't find the page you're looking for.
                </p>
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span className="text-white/90 text-sm font-medium">Let's get you back on track</span>
                </div>
              </div>

              {/* Enhanced Action Button */}
              <div className="mb-12">
                <Link href="/">
                  <a className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <Home className="w-5 h-5 mr-2" />
                    Go back home
                  </a>
                </Link>
              </div>
              
              {/* Enhanced Popular Pages */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Popular Pages</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/bible">
                    <a className="group block p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white group-hover:text-blue-300 transition-colors duration-200">Bible Reader</h4>
                          <p className="text-sm text-white/70">Read and study Scripture</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </a>
                  </Link>
                  
                  <Link href="/characters">
                    <a className="group block p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white group-hover:text-green-300 transition-colors duration-200">Biblical Characters</h4>
                          <p className="text-sm text-white/70">Explore key figures</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </a>
                  </Link>
                  
                  <Link href="/#chat">
                    <a className="group block p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors duration-200">Chat with AI</h4>
                          <p className="text-sm text-white/70">Get spiritual guidance</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              {/* Additional Help */}
              <div className="mt-8 text-center">
                <p className="text-white/60 text-sm">
                  Can't find what you're looking for? Try our{' '}
                  <Link href="/search">
                    <a className="text-blue-300 hover:text-blue-200 underline">search feature</a>
                  </Link>
                  {' '}to find biblical content.
                </p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    </>
  );
};

export default NotFoundPage;
