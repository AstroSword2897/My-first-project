import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Mock data for demonstration
const MOCK_CHARACTERS = [
  { id: 'moses', name: 'Moses', description: 'Prophet who led the Israelites out of Egypt' },
  { id: 'david', name: 'David', description: 'Second king of Israel, author of many Psalms' },
  { id: 'mary', name: 'Mary', description: 'Mother of Jesus' },
  { id: 'paul', name: 'Paul', description: 'Apostle who wrote many New Testament letters' },
  { id: 'esther', name: 'Esther', description: 'Jewish queen who saved her people from destruction' },
  { id: 'peter', name: 'Peter', description: 'Apostle of Jesus, leader of the early church' },
  { id: 'ruth', name: 'Ruth', description: 'Moabite woman who became an ancestor of David and Jesus' },
  { id: 'abraham', name: 'Abraham', description: 'Father of the Israelite nation' },
  { id: 'deborah', name: 'Deborah', description: 'Prophetess and judge of Israel' },
  { id: 'john', name: 'John the Apostle', description: 'Disciple of Jesus, author of the Gospel of John' },
];

export default function CharacterIndex() {
  const [characters, setCharacters] = useState<Array<{id: string, name: string, description: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setCharacters(MOCK_CHARACTERS);
      } catch (err) {
        console.error('Error fetching characters:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    character.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the filteredCharacters, but we could add debouncing here
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Biblical Characters</h1>
      
      {/* Search */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search characters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading characters...</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredCharacters.length > 0 ? (
              filteredCharacters.map((character) => (
                <li key={character.id}>
                  <Link 
                    href={`/characters/${character.id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-blue-600 truncate">
                          {character.name}
                        </p>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {character.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No characters found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No characters match your search. Try a different search term.
                </p>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
