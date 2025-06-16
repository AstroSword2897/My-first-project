import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { BookOpenIcon, UserGroupIcon, ChatBubbleLeftRightIcon, MagnifyingGlassIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { FaCross, FaDove } from 'react-icons/fa';

// Import ChatInterface with SSR disabled to avoid window is not defined errors
const ChatInterface = dynamic(() => import('../components/ChatInterface'), {
  ssr: false,
  loading: () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-96 flex items-center justify-center">
      <div className="animate-pulse text-gray-500 dark:text-gray-400">Loading chat interface...</div>
    </div>
  ),
});

const featureCards = [
  {
    name: 'Bible Reader',
    description: 'Read and study the Bible with multiple translations and easy navigation.',
    href: '/bible',
    icon: BookOpenIcon,
    bgColor: 'bg-blue-50 dark:bg-blue-900',
    textColor: 'text-blue-600 dark:text-blue-200',
  },
  {
    name: 'Biblical Characters',
    description: 'Explore detailed biographies of key biblical figures and their stories.',
    href: '/characters',
    icon: UserGroupIcon,
    bgColor: 'bg-purple-50 dark:bg-purple-900',
    textColor: 'text-purple-600 dark:text-purple-200',
  },
  {
    name: 'Chat with AI',
    description: 'Ask questions and get biblical insights and guidance.',
    href: '#chat',
    icon: ChatBubbleLeftRightIcon,
    bgColor: 'bg-green-50 dark:bg-green-900',
    textColor: 'text-green-600 dark:text-green-200',
  },
  {
    name: 'Search Scripture',
    description: 'Quickly find verses and passages across the Bible.',
    href: '/search',
    icon: MagnifyingGlassIcon,
    bgColor: 'bg-yellow-50 dark:bg-yellow-900',
    textColor: 'text-yellow-600 dark:text-yellow-200',
  },
];

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-background text-gray-100">
      <Head>
        <title>Biblical Chatbot - Explore the Bible & Connect with Faith</title>
        <meta name="description" content="Explore the Bible, study biblical characters, and get spiritual guidance with our interactive tools and AI chatbot." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        {/* Removed Biblical Guidance for Modern Believers section */}

        {/* Holy Trinity Section */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-12">
              The Holy Trinity
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
              {/* The Father */}
              <div className="flex flex-col items-center p-6 rounded-lg shadow-xl bg-gradient-father border border-gray-700">
                <BookOpenIcon className="h-16 w-16 text-blue-400 mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-semibold mb-2">God the Father</h3>
                <p className="text-lg text-gray-300">God the Father, our loving Creator, cares for us with boundless love and guides us with His unfailing wisdom. He's the source of all life and our ultimate comfort.</p>
              </div>

              {/* The Son */}
              <div className="flex flex-col items-center p-6 rounded-lg shadow-xl bg-gradient-son border border-gray-700">
                <FaCross className="h-16 w-16 text-red-400 mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-semibold mb-2">God the Son</h3>
                <p className="text-lg text-gray-300">God the Son, Jesus Christ, is our compassionate Savior and friend. Through His loving sacrifice, we receive grace, forgiveness, and the promise of eternal life.</p>
              </div>

              {/* The Holy Spirit */}
              <div className="flex flex-col items-center p-6 rounded-lg shadow-xl bg-gradient-spirit border border-gray-700">
                <FaDove className="h-16 w-16 text-yellow-400 mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-semibold mb-2">God the Holy Spirit</h3>
                <p className="text-lg text-gray-300">God the Holy Spirit is our constant Comforter, wise Counselor, and faithful Guide. He lives within us, empowering us with strength, peace, and understanding as we walk with God.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <p className="text-3xl leading-8 font-extrabold tracking-tight text-gray-100 sm:text-4xl">
                <span className="italic">"For God has not given us a spirit of timidity, but of power and love and discipline."</span>
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
                Remember you still need to actually read the Bible and put on the armour of God and as it says in 2 Corindthians 5:7 NASB, "'For we walk by faith, not by sight."
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
                    <div className="h-full bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
                      <div>
                        <span className={`inline-flex items-center justify-center p-3 rounded-md ${feature.bgColor} ${feature.textColor}`}>
                          <feature.icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-100">{feature.name}</h3>
                      <p className="mt-2 text-base text-gray-300">{feature.description}</p>
                      <div className="mt-4">
                        <span className="inline-flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300">
                          Learn more
                          <svg className="ml-1 h-4 w-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
        <div id="chat" className="py-12 bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-10">
              <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">Ask Anything</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-100 sm:text-4xl">
                Biblical Guidance Chat
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
                Ask questions about the Bible, theology, or seek spiritual guidance.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
              <ChatInterface />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-900">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to dive deeper?</span>
              <span className="block">Start exploring the Bible today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-200">Our tools are completely free to use. No signup required.</p>
            <Link 
              href="/bible"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-300 bg-gray-800 hover:bg-gray-700 sm:w-auto"
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
