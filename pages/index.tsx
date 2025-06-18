import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { BookOpenIcon, UserGroupIcon, ChatBubbleLeftRightIcon, MagnifyingGlassIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { FaCross, FaDove } from 'react-icons/fa';
import { BookOpen, Users, MessageCircle, Search, Heart, Shield, Star, ArrowRight, Sparkles, Moon, Sun, CloudRain } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';
import ThematicExplorer from '../src/components/Bible/ThematicExplorer';
import SpiritualJournal from '../src/components/Bible/SpiritualJournal';

// Import ChatInterface with SSR disabled to avoid window is not defined errors
const ChatInterfaceDynamic = dynamic(() => import('../components/ChatInterface'), {
  ssr: false,
  loading: () => (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 h-96 flex items-center justify-center">
      <div className="animate-pulse text-white/70">Loading chat interface...</div>
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
      color: 'from-blue-500 to-indigo-600',
      gradient: 'from-blue-500/20 to-indigo-600/20'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Biblical Characters',
      description: 'Explore the lives and lessons of key biblical figures.',
      href: '/characters',
      color: 'from-green-500 to-emerald-600',
      gradient: 'from-green-500/20 to-emerald-600/20'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Spiritual Guidance',
      description: 'Get AI-powered spiritual guidance and biblical wisdom.',
      href: '#',
      color: 'from-purple-500 to-pink-600',
      gradient: 'from-purple-500/20 to-pink-600/20',
      onClick: () => setActiveTab('chat')
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Advanced Search',
      description: 'Find verses and passages with fuzzy search and filters.',
      href: '/search',
      color: 'from-orange-500 to-red-600',
      gradient: 'from-orange-500/20 to-red-600/20'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Thematic Exploration',
      description: 'Explore biblical wisdom organized by spiritual themes.',
      href: '#',
      color: 'from-red-500 to-pink-600',
      gradient: 'from-red-500/20 to-pink-600/20',
      onClick: () => setActiveTab('themes')
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Spiritual Journal',
      description: 'Record your spiritual insights, prayers, and reflections.',
      href: '#',
      color: 'from-indigo-500 to-purple-600',
      gradient: 'from-indigo-500/20 to-purple-600/20',
      onClick: () => setActiveTab('journal')
    }
  ];

  const handleFeatureClick = (feature: any) => {
    if (feature.onClick) {
      feature.onClick();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

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

      {/* Enhanced Navigation */}
      <nav className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-white">Biblical Guidance</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/bible" className="text-white/80 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10">
                Bible
              </Link>
              <Link href="/characters" className="text-white/80 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10">
                Characters
              </Link>
              <Link href="/search" className="text-white/80 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10">
                Search
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white/90 text-sm font-medium">AI-Powered Spiritual Guidance</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Spiritual
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Guidance Companion
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Explore God's Word, seek spiritual guidance, and grow in your faith with AI-powered biblical wisdom, 
            thematic exploration, and personal reflection tools.
          </p>
        </div>

        {/* Enhanced Main Content Tabs */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
            <nav className="flex space-x-2">
              {[
                { id: 'chat', label: 'Spiritual Guidance Chat', icon: <MessageCircle className="w-5 h-5" /> },
                { id: 'themes', label: 'Thematic Exploration', icon: <Heart className="w-5 h-5" /> },
                { id: 'journal', label: 'Spiritual Journal', icon: <Shield className="w-5 h-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-3 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Enhanced Tab Content */}
        <div className="mb-16">
          {activeTab === 'chat' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <ChatInterface />
              </div>
            </div>
          )}
          
          {activeTab === 'themes' && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <ThematicExplorer />
              </div>
            </div>
          )}
          
          {activeTab === 'journal' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <SpiritualJournal />
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Feature Cards */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Explore All Features
            </h2>
            <p className="text-white/70 text-lg">
              Discover the full range of spiritual tools and resources
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.gradient}"></div>
                <div className="relative p-8">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">{feature.description}</p>
                  {feature.href === '#' ? (
                    <button
                      onClick={() => handleFeatureClick(feature)}
                      className="inline-flex items-center text-blue-300 hover:text-blue-200 font-semibold group-hover:translate-x-1 transition-transform duration-300"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  ) : (
                    <Link
                      href={feature.href}
                      className="inline-flex items-center text-blue-300 hover:text-blue-200 font-semibold group-hover:translate-x-1 transition-transform duration-300"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 via-purple-600/50 to-pink-600/50"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/30">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-medium">Start Your Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Spiritual Journey Today</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Whether you're seeking guidance, exploring biblical themes, or recording your spiritual insights, 
              we're here to support your faith journey with modern tools and timeless wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('chat')}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Spiritual Guidance
              </button>
              <button
                onClick={() => setActiveTab('themes')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Explore Themes
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="mt-20 pt-12 border-t border-white/20">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <p className="text-white/90 mb-4 text-lg">
                <strong>Important:</strong> This platform provides spiritual guidance and biblical wisdom for educational purposes.
              </p>
              <p className="text-white/70">
                While this tool offers biblical insights, reading God's Word directly and seeking human guidance remain essential for spiritual growth.
              </p>
            </div>
          </div>
        </footer>
      </main>

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
  );
};

export default Home;
