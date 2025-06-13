import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { BookOpenIcon, UserGroupIcon, ChatBubbleLeftRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Import ChatInterface with SSR disabled to avoid window is not defined errors
const ChatInterface = dynamic(() => import('../components/ChatInterface'), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-lg shadow-md p-6 h-96 flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading chat interface...</div>
    </div>
  ),
});

const featureCards = [
  {
    name: 'Bible Reader',
    description: 'Read and study the Bible with multiple translations and easy navigation.',
    href: '/bible',
    icon: BookOpenIcon,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    name: 'Biblical Characters',
    description: 'Explore detailed biographies of key biblical figures and their stories.',
    href: '/characters',
    icon: UserGroupIcon,
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    name: 'Chat with AI',
    description: 'Ask questions and get biblical insights and guidance.',
    href: '#chat',
    icon: ChatBubbleLeftRightIcon,
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
  },
  {
    name: 'Search Scripture',
    description: 'Quickly find verses and passages across the Bible.',
    href: '#',
    icon: MagnifyingGlassIcon,
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
  },
];

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Biblical Chatbot - Explore the Bible & Connect with Faith</title>
        <meta name="description" content="Explore the Bible, study biblical characters, and get spiritual guidance with our interactive tools and AI chatbot." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Biblical Guidance</span>
              <span className="block text-blue-600">for Modern Believers</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Explore the Bible, study biblical characters, and find spiritual guidance with our interactive tools and AI chatbot.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link 
                  href="/bible"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Read the Bible
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link 
                  href="#chat"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Chat with AI
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <p className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="italic">"For God has not given us a spirit of timidity, but of power and love and discipline."</span>
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                As you use these tools, remember that true understanding comes through God's grace. As it says in 2 Corinthians 5:7, 'For we walk by faith, not by sight.'
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {featureCards.map((feature) => (
                  <Link 
                    key={feature.name} 
                    href={feature.href}
                    className="group block h-full"
                  >
                    <div className="h-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
                      <div>
                        <span className={`inline-flex items-center justify-center p-3 rounded-md ${feature.bgColor} ${feature.textColor}`}>
                          <feature.icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.name}</h3>
                      <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                      <div className="mt-4">
                        <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-500">
                          Learn more
                          <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div id="chat" className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-10">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Ask Anything</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Biblical Guidance Chat
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Ask questions about the Bible, theology, or seek spiritual guidance.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <ChatInterface />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-700">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to dive deeper?</span>
              <span className="block">Start exploring the Bible today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-200">
              Our tools are completely free to use. No signup required.
            </p>
            <Link 
              href="/bible"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
            >
              Read the Bible
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
