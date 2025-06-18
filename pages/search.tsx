import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import BibleSearch from '../src/components/Bible/BibleSearch';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { BibleSearchResult } from '../src/types/bible';
import { Search, BookOpen, Sparkles, ArrowRight, Star } from 'lucide-react';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<BibleSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  // Update query when URL changes
  useEffect(() => {
    if (q && typeof q === 'string') {
      setQuery(q);
      if (q.trim()) {
        performSearch(q);
      } else {
        setResults([]);
        setSearchPerformed(false);
      }
    } else {
      setQuery('');
      setResults([]);
      setSearchPerformed(false);
    }
  }, [q]);

  // Mock search function - replace with actual API call
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSearchPerformed(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchPerformed(true);

    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock results - replace with actual API call
      const mockResults: BibleSearchResult[] = [
        {
          reference: 'John 3:16',
          text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
          book: 'John',
          chapter: 3,
          verse: 16
        },
        {
          reference: 'Jeremiah 29:11',
          text: 'For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future.',
          book: 'Jeremiah',
          chapter: 29,
          verse: 11
        },
        {
          reference: 'Romans 8:28',
          text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
          book: 'Romans',
          chapter: 8,
          verse: 28
        },
        {
          reference: 'Psalm 23:1',
          text: 'The LORD is my shepherd, I lack nothing.',
          book: 'Psalms',
          chapter: 23,
          verse: 1
        },
        {
          reference: 'Proverbs 3:5-6',
          text: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
          book: 'Proverbs',
          chapter: 3,
          verse: 5
        },
      ];

      // Filter results based on query
      const filteredResults = mockResults.filter(result => 
        result.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.reference.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setResults(filteredResults);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to perform search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Update URL with search query
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`, undefined, { 
        shallow: true,
        scroll: false
      });
    } else {
      // If search query is empty, clear results
      setResults([]);
      setSearchPerformed(false);
    }
  };

  // Format the reference to a URL-friendly format
  const formatReferenceUrl = (result: BibleSearchResult) => {
    const bookPath = result.book.toLowerCase();
    return `/bible/${bookPath}/${result.chapter}#v${result.verse}`;
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
        <title>{query ? `"${query}" - Bible Search` : 'Bible Search'}</title>
        <meta name="description" content={`Search the Bible for "${query || 'verses and passages'}"`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
              <Search className="w-5 h-5 text-blue-300" />
              <span className="text-white/90 text-sm font-medium">Scripture Search</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Search God's Word
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Find verses, passages, and biblical wisdom with our powerful search tools
            </p>
          </div>
          
          {/* Enhanced Search Component */}
          <div className="mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
              <BibleSearch 
                initialQuery={typeof q === 'string' ? q : ''} 
                className="mb-6"
                showQuickResults={false}
                onResultSelect={(result) => {
                  router.push(formatReferenceUrl(result));
                }}
              />
            </div>
          </div>

          {/* Enhanced Loading State */}
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Searching for "{query}"...</h3>
              <p className="text-white/70">Looking through the scriptures with divine wisdom</p>
            </div>
          ) : error ? (
            <div className="bg-red-900/50 backdrop-blur-sm border border-red-500/30 p-8 mb-8 rounded-2xl text-red-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-red-500/20 rounded-lg">
                  <svg className="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-red-200">Error performing search</h3>
                  <div className="mt-2 text-red-300">
                    <p>{error}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => performSearch(query)}
                      className="inline-flex items-center px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-200 rounded-lg hover:bg-red-500/30 transition-colors duration-200"
                    >
                      Try again
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : searchPerformed ? (
            results.length > 0 ? (
              <>
                {/* Enhanced Results Header */}
                <div className="mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                        </h2>
                        <p className="text-white/70 mt-1">
                          Showing {Math.min(results.length, 10)} of {results.length} verses
                        </p>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-white/20">
                        <BookOpen className="w-6 h-6 text-blue-300" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Results */}
                <div className="space-y-6">
                  {results.slice(0, 10).map((result, index) => (
                    <div key={index} className="group bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                      <Link href={formatReferenceUrl(result)}>
                        <a className="block hover:bg-white/5 transition-colors duration-300">
                          <div className="p-6 md:p-8">
                            <div className="flex items-start space-x-6">
                              <div className="flex-shrink-0">
                                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                                  <span className="text-white font-bold text-lg">{result.reference}</span>
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-3">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm font-medium text-white/70">{result.book} {result.chapter}:{result.verse}</span>
                                </div>
                                <p className="text-white/90 leading-relaxed text-lg">
                                  "{result.text}"
                                </p>
                                <div className="mt-4 flex items-center text-blue-300 group-hover:text-blue-200 transition-colors duration-200">
                                  <span className="text-sm font-medium">Read full context</span>
                                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 max-w-md mx-auto">
                  <div className="p-4 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-2xl inline-block mb-6">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
                  <p className="text-white/70 mb-6">
                    We couldn't find any verses matching "{query}". Try different keywords or phrases.
                  </p>
                  <div className="space-y-3">
                    <p className="text-sm text-white/60 font-medium">Try searching for:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['love', 'faith', 'hope', 'peace', 'grace'].map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSearch(term)}
                          className="px-4 py-2 bg-white/10 border border-white/20 text-white/80 rounded-lg hover:bg-white/20 transition-colors duration-200 text-sm"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 max-w-2xl mx-auto">
                <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl inline-block mb-6">
                  <Sparkles className="w-12 h-12 text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Search Scripture?</h3>
                <p className="text-white/80 mb-8 text-lg leading-relaxed">
                  Enter keywords, phrases, or verse references to find biblical wisdom and guidance. 
                  Our search helps you discover relevant passages across the entire Bible.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: '💝', title: 'Love & Grace', examples: ['love', 'grace', 'mercy'] },
                    { icon: '🙏', title: 'Prayer & Faith', examples: ['prayer', 'faith', 'trust'] },
                    { icon: '🌟', title: 'Hope & Peace', examples: ['hope', 'peace', 'joy'] }
                  ].map((category, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <h4 className="font-semibold text-white mb-2">{category.title}</h4>
                      <div className="space-y-1">
                        {category.examples.map((example) => (
                          <button
                            key={example}
                            onClick={() => handleSearch(example)}
                            className="block w-full text-left text-sm text-white/70 hover:text-white transition-colors duration-200"
                          >
                            • {example}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
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
}
