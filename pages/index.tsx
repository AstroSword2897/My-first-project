import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Import ChatInterface with SSR disabled to avoid window is not defined errors
const ChatInterface = dynamic(() => import('../components/ChatInterface'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Head>
        <title>Biblical Chatbot</title>
        <meta name="description" content="A chatbot providing biblical guidance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Biblical Guidance Assistant
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Ask me anything about the Bible or seek spiritual guidance
        </p>
        
        {/* Chat Interface */}
        <ChatInterface />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This is a demonstration of a biblical guidance chatbot.</p>
          <p className="mt-2">
            Try asking questions like "What does the Bible say about love?" or "How should I pray?"
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
