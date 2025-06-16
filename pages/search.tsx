import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import BibleSearch from '../src/components/Bible/BibleSearch';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { BibleSearchResult } from '../src/types/bible';

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
    <div className="min-h-screen bg-gradient-background text-gray-100">
      <Head>
        <title>{query ? `"${query}" - Bible Search` : 'Bible Search'}</title>
        <meta name="description" content={`Search the Bible for "${query || 'verses and passages'}"`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-100">Bible Search</h1>
          
          <div className="mb-8">
            <BibleSearch 
              initialQuery={typeof q === 'string' ? q : ''} 
              className="mb-6"
              showQuickResults={false}
              onResultSelect={(result) => {
                router.push(formatReferenceUrl(result));
              }}
            />
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400"></div>
              <p className="mt-4 text-gray-300 font-medium">Searching for "{query}"...</p>
              <p className="text-sm text-gray-400 mt-1">Looking through the scriptures...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900 border-l-4 border-red-700 p-6 mb-8 rounded-md text-red-100">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-200">Error performing search</h3>
                  <div className="mt-2 text-sm text-red-300">
                    <p>{error}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => performSearch(query)}
                      className="text-sm font-medium text-red-200 hover:text-red-100 focus:outline-none"
                    >
                      Try again <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : searchPerformed ? (
            results.length > 0 ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-100">
                    {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Showing {Math.min(results.length, 10)} of {results.length} verses
                  </p>
                </div>
                <div className="space-y-5">
                  {results.slice(0, 10).map((result, index) => (
                    <div key={index} className="bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                      <Link href={formatReferenceUrl(result)}>
                        <a className="block hover:bg-gray-700 transition-colors duration-150">
                          <div className="p-5 md:p-6">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 bg-blue-900 rounded-lg p-3">
                                <span className="text-blue-200 font-semibold text-lg">{result.reference}</span>
                              </div>
                              <div className="ml-4 flex-1">
                                <p className="text-gray-200 leading-relaxed">
                                  {result.text}
                                </p>
                                <div className="mt-3">
                                  <span className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 group">
                                    Read full chapter
                                    <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
                {results.length > 10 && (
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                      Showing 10 of {results.length} results. <button className="text-blue-400 hover:text-blue-300 font-medium">Load more</button>
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-gray-800 rounded-xl shadow-sm">
                <MagnifyingGlassIcon className="mx-auto h-14 w-14 text-gray-600" />
                <h3 className="mt-4 text-xl font-medium text-gray-100">No results found</h3>
                <p className="mt-2 text-gray-300 max-w-md mx-auto">
                  We couldn't find any verses matching <span className="font-medium">"{query}"</span>.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/bible')}
                    className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Browse the Bible
                    <svg className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </button>
                </div>
                <div className="mt-8">
                  <h4 className="text-sm font-medium text-gray-200">Search tips:</h4>
                  <ul className="mt-2 text-sm text-gray-400 max-w-md mx-auto space-y-1">
                    <li>• Try different keywords or synonyms</li>
                    <li>• Use fewer words for broader results</li>
                    <li>• Check your spelling</li>
                  </ul>
                </div>
              </div>
            )
          ) : (
            <div className="text-center py-20">
              <MagnifyingGlassIcon className="mx-auto h-20 w-20 text-gray-700" />
              <p className="mt-4 text-xl text-gray-300">Start searching the Bible</p>
              <p className="mt-2 text-gray-400">Enter keywords or a verse reference above to find passages.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
