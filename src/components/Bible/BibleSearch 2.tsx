import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { BibleSearchResult } from '../../types/bible';

interface BibleSearchProps {
  initialQuery?: string;
  className?: string;
  showQuickResults?: boolean;
  onResultSelect?: (result: BibleSearchResult) => void;
}

export default function BibleSearch({ 
  initialQuery = '', 
  className = '',
  showQuickResults = false,
  onResultSelect
}: BibleSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [quickResults, setQuickResults] = useState<BibleSearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Update query if initialQuery changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    if (onResultSelect && showQuickResults) {
      // If we have an onResultSelect handler, we're in inline search mode
      try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 300));
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
        ];
        
        setQuickResults(mockResults);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    } else {
      // Navigate to search results page
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    setQuickResults([]);
    setShowResults(false);
  };

  const handleResultClick = (result: BibleSearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
      setShowResults(false);
    } else {
      router.push(`/bible/${result.book.toLowerCase()}/${result.chapter}#v${result.verse}`);
    }
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`.trim()} ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
            placeholder="Search the Bible..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(!!e.target.value.trim());
            }}
            onFocus={() => query.trim() && setShowResults(true)}
            disabled={isSearching}
            aria-label="Search the Bible"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-10 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute inset-y-0 right-0 px-4 flex items-center text-sm font-medium text-white bg-blue-600 rounded-r-lg border border-transparent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      {showQuickResults && showResults && query.trim() && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg overflow-hidden">
          {quickResults.length > 0 ? (
            <ul className="max-h-96 overflow-auto py-1">
              {quickResults.map((result, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="font-medium text-blue-600">{result.reference}</div>
                    <div className="text-sm text-gray-600 truncate">{result.text}</div>
                  </button>
                </li>
              ))}
              <li className="border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
                  className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  View all results for "{query}"
                </button>
              </li>
            </ul>
          ) : (
            <div className="px-4 py-8 text-center">
              {isSearching ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <p className="mt-2 text-sm text-gray-500">Searching...</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No results found. Try different keywords.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
