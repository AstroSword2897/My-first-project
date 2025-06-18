import { useRouter } from 'next/router';
import CharacterBio from '../../src/components/characters/CharacterBio';
import { BiblicalCharacter } from '@/types/characters';
import { MOCK_CHARACTERS, CHARACTER_IDS } from '@/data/mockCharacters';

interface CharacterPageProps {
  character: BiblicalCharacter | null;
  error?: string;
}

export default function CharacterPage({ character, error }: CharacterPageProps) {
  const router = useRouter();

  // If the page is not yet generated, show a loading state
  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50">
        <div className="max-w-6xl mx-auto py-12 px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-orange-600 text-lg">Loading character information...</p>
        </div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-700 text-lg">{error || 'Character not found'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <CharacterBio character={character} />
      </div>
    </div>
  );
}

// Pre-render all character pages at build time
export async function getStaticPaths() {
  const paths = CHARACTER_IDS.map(character => ({
    params: { character }
  }));

  // Since we know all possible characters at build time,
  // we can use fallback: false for better performance and security
  return { 
    paths,
    fallback: false // 404 for unknown paths
  };
}

export async function getStaticProps({ params }: { params: { character: string } }) {
  try {
    const characterId = params.character;
    const character = MOCK_CHARACTERS[characterId];

    if (!character) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        character
      },
      // Re-generate the page at most once per second
      // if there are requests coming in
      revalidate: 60 // In seconds
    };
  } catch (error) {
    return {
      props: {
        character: null,
        error: 'Failed to load character'
      }
    };
  }
}
