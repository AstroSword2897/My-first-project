import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import BibleSearch from '../../src/components/Bible/BibleSearch';
import { BookOpenIcon } from '@heroicons/react/24/outline';

// Dynamically import BibleReader with SSR disabled
const BibleReader = dynamic(() => import('../../src/components/Bible/BibleReader'), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-100 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-3/4"></div>
      </div>
    </div>
  ),
});

export default function BiblePage() {
  const router = useRouter();
  const { params = [] } = router.query;
  const [book = 'genesis', chapter = '1'] = params as string[];
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Update search query when URL changes
  useEffect(() => {
    if (router.isReady) {
      const { q } = router.query;
      if (q && typeof q === 'string') {
        setSearchQuery(q);
        setShowSearch(true);
      } else {
        setSearchQuery('');
        setShowSearch(false);
      }
    }
  }, [router.isReady, router.query]);

  const handleSearchResultSelect = (result: any) => {
    // Handle when a search result is selected
    const bookPath = result.book.toLowerCase();
    router.push(`/bible/${bookPath}/${result.chapter}#v${result.verse}`);
  };

  const title = book 
    ? `${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter} - Bible`
    : 'Bible';
  
  const description = book && chapter 
    ? `Read ${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter} from the Bible`
    : 'Read and study the Bible online';

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="max-w-4xl mx-auto py-6 px-4 sm:py-8">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bible</h1>
              <p className="mt-1 text-sm text-gray-600">
                Read, study, and explore God's Word
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setShowSearch(!showSearch)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <BookOpenIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                {showSearch ? 'Hide Search' : 'Search Bible'}
              </button>
            </div>
          </div>
          
          {showSearch && (
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <BibleSearch 
                initialQuery={searchQuery}
                showQuickResults={true}
                onResultSelect={handleSearchResultSelect}
                className="mb-0"
              />
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <BibleReader 
            initialBook={book} 
            initialChapter={parseInt(chapter) || 1}
            className="p-4 sm:p-6"
            showSearch={false}
          />
        </div>
      </main>
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Pre-render only a few paths at build time
  const paths = [
    { params: { params: ['Genesis', '1'] } },
    { params: { params: ['John', '3'] } },
    { params: { params: ['Psalms', '23'] } },
  ];

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
