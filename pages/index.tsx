import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { BookOpenIcon, UserGroupIcon, ChatBubbleLeftRightIcon, MagnifyingGlassIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { FaCross, FaDove } from 'react-icons/fa';
import { BookOpen, Users, MessageCircle, Search, Heart, Shield, Star, ArrowRight } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';
import ThematicExplorer from '../src/components/Bible/ThematicExplorer';
import SpiritualJournal from '../src/components/Bible/SpiritualJournal';

// Import ChatInterface with SSR disabled to avoid window is not defined errors
const ChatInterfaceDynamic = dynamic(() => import('../components/ChatInterface'), {
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
  const [activeTab, setActiveTab] = useState<'chat' | 'themes' | 'journal'>('chat');

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Bible Reader',
      description: 'Read and study Scripture with multiple translations and easy navigation.',
      href: '/bible',
      color: 'bg-blue-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Biblical Characters',
      description: 'Explore the lives and lessons of key biblical figures.',
      href: '/characters',
      color: 'bg-green-500'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Spiritual Guidance',
      description: 'Get AI-powered spiritual guidance and biblical wisdom.',
      href: '#',
      color: 'bg-purple-500',
      onClick: () => setActiveTab('chat')
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Advanced Search',
      description: 'Find verses and passages with fuzzy search and filters.',
      href: '/search',
      color: 'bg-orange-500'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Thematic Exploration',
      description: 'Explore biblical wisdom organized by spiritual themes.',
      href: '#',
      color: 'bg-red-500',
      onClick: () => setActiveTab('themes')
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Spiritual Journal',
      description: 'Record your spiritual insights, prayers, and reflections.',
      href: '#',
      color: 'bg-indigo-500',
      onClick: () => setActiveTab('journal')
    }
  ];

  const handleFeatureClick = (feature: any) => {
    if (feature.onClick) {
      feature.onClick();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Biblical Chatbot & Study Tool - Spiritual Guidance Platform</title>
        <meta name="description" content="A comprehensive spiritual guidance platform with AI-powered biblical wisdom, thematic exploration, and personal reflection tools." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Biblical Chatbot & Study Tool" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Bible Study" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#3b82f6" />
        
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Star className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Biblical Guidance</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/bible" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Bible
              </Link>
              <Link href="/characters" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Characters
              </Link>
              <Link href="/search" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Search
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Spiritual Guidance Companion
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore God's Word, seek spiritual guidance, and grow in your faith with AI-powered biblical wisdom, 
            thematic exploration, and personal reflection tools.
          </p>
        </div>

        {/* Main Content Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'chat', label: 'Spiritual Guidance Chat', icon: <MessageCircle className="w-5 h-5" /> },
                { id: 'themes', label: 'Thematic Exploration', icon: <Heart className="w-5 h-5" /> },
                { id: 'journal', label: 'Spiritual Journal', icon: <Shield className="w-5 h-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {activeTab === 'chat' && (
            <div className="max-w-4xl mx-auto">
              <ChatInterface />
            </div>
          )}
          
          {activeTab === 'themes' && (
            <div className="max-w-6xl mx-auto">
              <ThematicExplorer />
            </div>
          )}
          
          {activeTab === 'journal' && (
            <div className="max-w-4xl mx-auto">
              <SpiritualJournal />
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Explore All Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-lg text-white mb-4 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  {feature.href === '#' ? (
                    <button
                      onClick={() => handleFeatureClick(feature)}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  ) : (
                    <Link
                      href={feature.href}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Start Your Spiritual Journey Today</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Whether you're seeking guidance, exploring biblical themes, or recording your spiritual insights, 
            we're here to support your faith journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab('chat')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Get Spiritual Guidance
            </button>
            <button
              onClick={() => setActiveTab('themes')}
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Explore Themes
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <strong>Important:</strong> This platform provides spiritual guidance and biblical wisdom for educational purposes.
            </p>
            <p className="text-sm">
              For personal spiritual matters, counseling, or pastoral care, please consult with your pastor, 
              spiritual mentor, or qualified religious leader.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
