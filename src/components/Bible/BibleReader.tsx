import { useState, useEffect, useRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import StudyChat from './StudyChat';
import { BIBLE_BOOKS as BIBLE_BOOKS_DATA, BibleBookInfo } from '../../../lib/bibleData';
import { bibleService, BibleVerse } from '../../../lib/bibleService';

interface BibleReaderProps {
  initialBook?: string;
  initialChapter?: number;
  translation?: string;
  showSearch?: boolean;
  className?: string;
}

// Use the BIBLE_BOOKS_DATA from bibleData instead of redefining it here

export default function BibleReader({
  initialBook = 'Genesis',
  initialChapter = 1,
  translation: initialTranslation = 'NASB',
  showSearch = true,
  className = '',
}: BibleReaderProps) {
  const rootClasses = `bible-reader bg-white rounded-lg shadow-md p-4 ${className}`.trim();
  const [currentBook, setCurrentBook] = useState<string>(initialBook);
  const [currentChapter, setCurrentChapter] = useState<number>(initialChapter);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showStudyChat, setShowStudyChat] = useState<boolean>(false);
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [translation, setTranslation] = useState<string>(initialTranslation);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Get the current book data and generate chapters array
  const currentBookInfo = BIBLE_BOOKS_DATA.find((book: BibleBookInfo) => book.name === currentBook) || BIBLE_BOOKS_DATA[0];
  const chapters = Array.from({ length: currentBookInfo?.chapters || 50 }, (_, i) => i + 1);

  const fetchChapter = async (book: string, chapter: number) => {
    try {
      setLoading(true);
      setError(null);
      
      // Get the book data
      const bookData = BIBLE_BOOKS_DATA.find((b: BibleBookInfo) => b.name === book);
      if (!bookData) {
        throw new Error('Book not found');
      }
      
      // Format the reference (e.g., "John 3")
      const reference = `${book} ${chapter}`;
      
      // Fetch the passage using bibleService
      const passage = await bibleService.getPassage(reference, translation);
      
      // Transform the verses to our BibleVerse format
      const formattedVerses = passage.verses.map(verse => ({
        book,
        chapter,
        verse: verse.verse,
        text: verse.text,
        version: translation,
        bookNumber: bookData.bookNumber
      } as BibleVerse));
      
      setVerses(formattedVerses);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load chapter';
      setError(errorMessage);
      console.error('Error fetching chapter:', err);
      
      // Fallback to mock data if API fails
      const fallbackBookNumber = BIBLE_BOOKS_DATA.find((b: BibleBookInfo) => b.name === book)?.bookNumber || 1;
      setVerses([
        { 
          book, 
          chapter, 
          verse: 1, 
          text: `[Error: Could not load ${book} ${chapter}. Please check your internet connection or try again later.]`,
          version: translation,
          bookNumber: fallbackBookNumber 
        } as BibleVerse
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapter(currentBook, currentChapter);
  }, [currentBook, currentChapter, translation]);

  const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentBook(e.target.value);
    // Reset to first chapter when book changes
    setCurrentChapter(1);
  };

  const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentChapter(Number(e.target.value));
  };

  const handleVerseClick = (verse: BibleVerse) => {
    setSelectedVerse(verse);
    if (showStudyChat) return;
    setShowStudyChat(true);
  };

  const handleAskQuestion = async (question: string) => {
    // TODO: Implement AI question answering
    console.log(`Question about ${selectedVerse?.book} ${selectedVerse?.chapter}:${selectedVerse?.verse}: ${question}`);
    // Here you would typically call an API to get an AI response
  };

  const navigateChapter = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    } else if (direction === 'next' && currentBookInfo && currentChapter < currentBookInfo.chapters) {
      setCurrentChapter(currentChapter + 1);
    } else if (direction === 'next' && currentBookInfo) {
      // Move to next book if available
      const currentIndex = BIBLE_BOOKS_DATA.findIndex((book: BibleBookInfo) => book.name === currentBook);
      if (currentIndex < BIBLE_BOOKS_DATA.length - 1) {
        setCurrentBook(BIBLE_BOOKS_DATA[currentIndex + 1].name);
        setCurrentChapter(1);
      }
    }
  };

  useEffect(() => {
    fetchChapter(currentBook, currentChapter);
    // Scroll to top when chapter changes
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentBook, currentChapter]);

  return (
    <div className={`${rootClasses} relative`}>
      {showStudyChat && (
        <div className="absolute bottom-4 left-4 z-40">
          <StudyChat 
            onClose={() => setShowStudyChat(false)}
            onAskQuestion={handleAskQuestion}
          />
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {currentBook} {currentChapter}
        </h2>
        <button
          onClick={() => setShowStudyChat(!showStudyChat)}
          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
          aria-label="Open study tools"
        >
          <BookOpenIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="book-select" className="block text-sm font-medium text-gray-700 mb-1">
            Book
          </label>
          <select
            id="book-select"
            value={currentBook}
            onChange={(e) => {
              setCurrentBook(e.target.value);
              setCurrentChapter(1);
            }}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {BIBLE_BOOKS_DATA.map((book: BibleBookInfo) => (
              <option key={book.name} value={book.name}>
                {book.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[120px]">
          <label htmlFor="chapter-select" className="block text-sm font-medium text-gray-700 mb-1">
            Chapter
          </label>
          <select
            id="chapter-select"
            value={currentChapter}
            onChange={(e) => setCurrentChapter(Number(e.target.value))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {chapters.map((chapter) => (
              <option key={chapter} value={chapter}>
                {chapter}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label htmlFor="translation-select" className="block text-sm font-medium text-gray-700 mb-1">
            Translation
          </label>
          <select
            id="translation-select"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="NIV">NIV</option>
            <option value="ESV">ESV</option>
            <option value="KJV">KJV</option>
            <option value="NASB">NASB</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div 
        ref={contentRef}
        className="mt-6 space-y-4 pb-20 max-h-[calc(100vh-250px)] overflow-y-auto"
      >
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-red-600 text-center py-8">{error}</div>
        ) : (
          <div className="space-y-6">
            {verses.map((verse) => (
              <div 
                key={`${verse.book}-${verse.chapter}-${verse.verse}`} 
                className={`verse p-3 rounded-lg transition-colors cursor-pointer hover:bg-gray-50 ${selectedVerse?.verse === verse.verse ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                onClick={() => handleVerseClick(verse)}
              >
                <span className="text-sm font-semibold text-blue-600">{verse.verse}</span>
                <span className="ml-2">{verse.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 flex justify-between">
        <button
          onClick={() => navigateChapter('prev')}
          disabled={currentChapter === 1}
          className={`flex items-center space-x-1 px-4 py-2 rounded-md ${currentChapter === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Previous</span>
        </button>
        <div className="text-sm text-gray-500 self-center">
          {currentBook} {currentChapter}
        </div>
        <button
          onClick={() => navigateChapter('next')}
          disabled={currentChapter >= (currentBookInfo?.chapters || 0)}
          className={`flex items-center space-x-1 px-4 py-2 rounded-md ${currentChapter >= (currentBookInfo?.chapters || 0) ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
        >
          <span>Next</span>
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
