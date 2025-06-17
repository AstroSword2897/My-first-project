import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { BibleSearchResult } from '../../types/bible';

interface BibleSearchProps {
  initialQuery?: string;
  className?: string;
  showQuickResults?: boolean;
  onResultSelect?: (result: BibleSearchResult) => void;
}

// Bible books for filtering
const BIBLE_BOOKS = [
  { name: 'Genesis', category: 'Law' },
  { name: 'Exodus', category: 'Law' },
  { name: 'Leviticus', category: 'Law' },
  { name: 'Numbers', category: 'Law' },
  { name: 'Deuteronomy', category: 'Law' },
  { name: 'Joshua', category: 'Historical' },
  { name: 'Judges', category: 'Historical' },
  { name: 'Ruth', category: 'Historical' },
  { name: '1 Samuel', category: 'Historical' },
  { name: '2 Samuel', category: 'Historical' },
  { name: '1 Kings', category: 'Historical' },
  { name: '2 Kings', category: 'Historical' },
  { name: '1 Chronicles', category: 'Historical' },
  { name: '2 Chronicles', category: 'Historical' },
  { name: 'Ezra', category: 'Historical' },
  { name: 'Nehemiah', category: 'Historical' },
  { name: 'Esther', category: 'Historical' },
  { name: 'Job', category: 'Wisdom' },
  { name: 'Psalms', category: 'Wisdom' },
  { name: 'Proverbs', category: 'Wisdom' },
  { name: 'Ecclesiastes', category: 'Wisdom' },
  { name: 'Song of Solomon', category: 'Wisdom' },
  { name: 'Isaiah', category: 'Prophetic' },
  { name: 'Jeremiah', category: 'Prophetic' },
  { name: 'Lamentations', category: 'Prophetic' },
  { name: 'Ezekiel', category: 'Prophetic' },
  { name: 'Daniel', category: 'Prophetic' },
  { name: 'Hosea', category: 'Prophetic' },
  { name: 'Joel', category: 'Prophetic' },
  { name: 'Amos', category: 'Prophetic' },
  { name: 'Obadiah', category: 'Prophetic' },
  { name: 'Jonah', category: 'Prophetic' },
  { name: 'Micah', category: 'Prophetic' },
  { name: 'Nahum', category: 'Prophetic' },
  { name: 'Habakkuk', category: 'Prophetic' },
  { name: 'Zephaniah', category: 'Prophetic' },
  { name: 'Haggai', category: 'Prophetic' },
  { name: 'Zechariah', category: 'Prophetic' },
  { name: 'Malachi', category: 'Prophetic' },
  { name: 'Matthew', category: 'Gospel' },
  { name: 'Mark', category: 'Gospel' },
  { name: 'Luke', category: 'Gospel' },
  { name: 'John', category: 'Gospel' },
  { name: 'Acts', category: 'Historical' },
  { name: 'Romans', category: 'Epistle' },
  { name: '1 Corinthians', category: 'Epistle' },
  { name: '2 Corinthians', category: 'Epistle' },
  { name: 'Galatians', category: 'Epistle' },
  { name: 'Ephesians', category: 'Epistle' },
  { name: 'Philippians', category: 'Epistle' },
  { name: 'Colossians', category: 'Epistle' },
  { name: '1 Thessalonians', category: 'Epistle' },
  { name: '2 Thessalonians', category: 'Epistle' },
  { name: '1 Timothy', category: 'Epistle' },
  { name: '2 Timothy', category: 'Epistle' },
  { name: 'Titus', category: 'Epistle' },
  { name: 'Philemon', category: 'Epistle' },
  { name: 'Hebrews', category: 'Epistle' },
  { name: 'James', category: 'Epistle' },
  { name: '1 Peter', category: 'Epistle' },
  { name: '2 Peter', category: 'Epistle' },
  { name: '1 John', category: 'Epistle' },
  { name: '2 John', category: 'Epistle' },
  { name: '3 John', category: 'Epistle' },
  { name: 'Jude', category: 'Epistle' },
  { name: 'Revelation', category: 'Apocalyptic' },
];

// Common search terms for autocomplete
const COMMON_SEARCH_TERMS = [
  'faith', 'love', 'hope', 'grace', 'mercy', 'forgiveness', 'salvation',
  'prayer', 'worship', 'praise', 'thanksgiving', 'repentance', 'obedience',
  'trust', 'wisdom', 'knowledge', 'understanding', 'fear of the Lord',
  'righteousness', 'holiness', 'sanctification', 'justification', 'redemption',
  'covenant', 'promise', 'blessing', 'curse', 'sin', 'temptation', 'trial',
  'suffering', 'comfort', 'peace', 'joy', 'patience', 'kindness', 'goodness',
  'gentleness', 'self-control', 'humility', 'pride', 'anger', 'envy', 'greed'
];

// Fuzzy search function
function fuzzySearch(text: string, query: string): boolean {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();
  
  // Exact match
  if (textLower.includes(queryLower)) return true;
  
  // Fuzzy match (allowing for typos and partial matches)
  const queryWords = queryLower.split(/\s+/);
  return queryWords.every(word => {
    if (word.length < 3) return textLower.includes(word);
    
    // Check for fuzzy match with up to 2 character differences
    for (let i = 0; i <= textLower.length - word.length; i++) {
      const substring = textLower.substring(i, i + word.length);
      let differences = 0;
      
      for (let j = 0; j < word.length; j++) {
        if (substring[j] !== word[j]) differences++;
        if (differences > 2) break;
      }
      
      if (differences <= 2) return true;
    }
    return false;
  });
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
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Update query if initialQuery changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Generate autocomplete suggestions
  useEffect(() => {
    if (query.trim().length < 2) {
      setAutocompleteSuggestions([]);
      return;
    }

    const suggestions = [
      ...BIBLE_BOOKS.filter(book => 
        fuzzySearch(book.name, query)
      ).map(book => book.name),
      ...COMMON_SEARCH_TERMS.filter(term => 
        fuzzySearch(term, query)
      ),
      ...BIBLE_BOOKS.filter(book => 
        fuzzySearch(book.category, query)
      ).map(book => `${book.category} books`)
    ].slice(0, 8);

    setAutocompleteSuggestions(Array.from(new Set(suggestions)));
  }, [query]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setShowFilters(false);
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
        
        // Apply filters
        let filteredResults = mockResults;
        if (selectedBook) {
          filteredResults = filteredResults.filter(result => 
            result.book.toLowerCase() === selectedBook.toLowerCase()
          );
        }
        if (selectedCategory) {
          const categoryBooks = BIBLE_BOOKS
            .filter(book => book.category === selectedCategory)
            .map(book => book.name);
          filteredResults = filteredResults.filter(result => 
            categoryBooks.includes(result.book)
          );
        }
        
        setQuickResults(filteredResults);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    } else {
      // Navigate to search results page with filters
      const params = new URLSearchParams();
      params.set('q', query);
      if (selectedBook) params.set('book', selectedBook);
      if (selectedCategory) params.set('category', selectedCategory);
      router.push(`/search?${params.toString()}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    setQuickResults([]);
    setShowResults(false);
    setSelectedBook('');
    setSelectedCategory('');
    setAutocompleteSuggestions([]);
  };

  const handleResultClick = (result: BibleSearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
      setShowResults(false);
    } else {
      router.push(`/bible/${result.book.toLowerCase()}/${result.chapter}#v${result.verse}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowResults(false);
    setAutocompleteSuggestions([]);
  };

  const categories = Array.from(new Set(BIBLE_BOOKS.map(book => book.category)));

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`.trim()} ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
            placeholder="Search the Bible (e.g., 'faith', 'John 3:16', 'love')..."
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
              className="absolute inset-y-0 right-16 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="absolute inset-y-0 right-8 px-2 flex items-center text-gray-400 hover:text-gray-600"
            aria-label="Toggle filters"
          >
            <FunnelIcon className="h-5 w-5" />
          </button>
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute inset-y-0 right-0 px-4 flex items-center text-sm font-medium text-white bg-blue-600 rounded-r-lg border border-transparent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Filters Panel */}
      {showFilters && (
        <div className="absolute z-20 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Book</label>
              <select
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Books</option>
                {BIBLE_BOOKS.map(book => (
                  <option key={book.name} value={book.name}>{book.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={() => {
                setSelectedBook('');
                setSelectedCategory('');
              }}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Clear Filters
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Autocomplete Suggestions */}
      {autocompleteSuggestions.length > 0 && query.trim() && !showResults && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg overflow-hidden">
          <ul className="py-1">
            {autocompleteSuggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-150"
                >
                  <div className="text-sm text-gray-900">{suggestion}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
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
                  onClick={() => {
                    const params = new URLSearchParams();
                    params.set('q', query);
                    if (selectedBook) params.set('book', selectedBook);
                    if (selectedCategory) params.set('category', selectedCategory);
                    router.push(`/search?${params.toString()}`);
                  }}
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
                <p className="text-sm text-gray-500">No results found. Try different keywords or adjust filters.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
