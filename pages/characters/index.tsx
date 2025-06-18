import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Expanded mock data with more characters
const MOCK_CHARACTERS = [
  { id: 'moses', name: 'Moses', description: 'Prophet who led the Israelites out of Egypt and received the Ten Commandments' },
  { id: 'david', name: 'David', description: 'Second king of Israel, author of many Psalms, man after God\'s own heart' },
  { id: 'mary', name: 'Mary', description: 'Mother of Jesus, chosen by God to bear the Savior of the world' },
  { id: 'paul', name: 'Paul', description: 'Apostle who wrote many New Testament letters, former persecutor turned missionary' },
  { id: 'esther', name: 'Esther', description: 'Jewish queen who saved her people from destruction through courage and faith' },
  { id: 'peter', name: 'Peter', description: 'Apostle of Jesus, leader of the early church, known for his bold faith' },
  { id: 'ruth', name: 'Ruth', description: 'Moabite woman who became an ancestor of David and Jesus through loyalty and faith' },
  { id: 'abraham', name: 'Abraham', description: 'Father of the Israelite nation, known for his faith and obedience to God' },
  { id: 'deborah', name: 'Deborah', description: 'Prophetess and judge of Israel, led the nation to victory over enemies' },
  { id: 'john', name: 'John the Apostle', description: 'Disciple of Jesus, author of the Gospel of John and Revelation' },
  { id: 'elijah', name: 'Elijah', description: 'Prophet who challenged the prophets of Baal and was taken to heaven in a chariot' },
  { id: 'daniel', name: 'Daniel', description: 'Prophet who interpreted dreams and remained faithful in Babylonian captivity' },
  { id: 'joseph', name: 'Joseph', description: 'Son of Jacob, sold into slavery but rose to power in Egypt' },
  { id: 'samuel', name: 'Samuel', description: 'Prophet and judge who anointed both Saul and David as kings' },
  { id: 'solomon', name: 'Solomon', description: 'Son of David, wisest king of Israel, builder of the first temple' },
  { id: 'isaiah', name: 'Isaiah', description: 'Major prophet who foretold the coming of the Messiah' },
  { id: 'jeremiah', name: 'Jeremiah', description: 'Prophet known as the weeping prophet, warned of Jerusalem\'s destruction' },
  { id: 'ezekiel', name: 'Ezekiel', description: 'Prophet who had dramatic visions and prophesied during the exile' },
  { id: 'jonah', name: 'Jonah', description: 'Prophet who was swallowed by a great fish and preached to Nineveh' },
  { id: 'job', name: 'Job', description: 'Righteous man who endured great suffering and remained faithful to God' },
  { id: 'noah', name: 'Noah', description: 'Righteous man who built the ark and saved humanity from the flood' },
  { id: 'joshua', name: 'Joshua', description: 'Successor to Moses who led Israel into the Promised Land' },
  { id: 'gideon', name: 'Gideon', description: 'Judge who led Israel to victory with only 300 men' },
  { id: 'samson', name: 'Samson', description: 'Judge with supernatural strength who fought against the Philistines' },
  { id: 'hannah', name: 'Hannah', description: 'Mother of Samuel, prayed for a child and dedicated him to God' },
  { id: 'rachel', name: 'Rachel', description: 'Wife of Jacob, mother of Joseph and Benjamin' },
  { id: 'rebecca', name: 'Rebecca', description: 'Wife of Isaac, mother of Jacob and Esau' },
  { id: 'sarah', name: 'Sarah', description: 'Wife of Abraham, mother of Isaac, laughed when told she would bear a child' },
  { id: 'miriam', name: 'Miriam', description: 'Sister of Moses and Aaron, prophetess who led the women in song' },
  { id: 'jephthah', name: 'Jephthah', description: 'Judge who made a rash vow but led Israel to victory' },
  { id: 'boaz', name: 'Boaz', description: 'Kinsman-redeemer who married Ruth and became ancestor of David' },
  { id: 'nehemiah', name: 'Nehemiah', description: 'Cupbearer to the king who rebuilt the walls of Jerusalem' },
  { id: 'ezra', name: 'Ezra', description: 'Priest and scribe who led the return from exile and restored the law' },
  { id: 'malachi', name: 'Malachi', description: 'Last prophet of the Old Testament, called for repentance' },
  { id: 'matthew', name: 'Matthew', description: 'Tax collector turned disciple, author of the first Gospel' },
  { id: 'mark', name: 'Mark', description: 'Author of the second Gospel, companion of Peter' },
  { id: 'luke', name: 'Luke', description: 'Physician and author of the third Gospel and Acts' },
  { id: 'thomas', name: 'Thomas', description: 'Disciple known as the doubter who later proclaimed Jesus as Lord' },
  { id: 'andrew', name: 'Andrew', description: 'Disciple who brought his brother Peter to Jesus' },
  { id: 'philip', name: 'Philip', description: 'Disciple who brought Nathanael to Jesus and asked to see the Father' },
  { id: 'bartholomew', name: 'Bartholomew', description: 'Disciple also known as Nathanael, from Cana' },
  { id: 'james', name: 'James', description: 'Son of Zebedee, brother of John, one of the inner circle of disciples' },
  { id: 'james-minor', name: 'James the Less', description: 'Son of Alphaeus, another disciple of Jesus' },
  { id: 'jude', name: 'Jude', description: 'Also called Thaddaeus, disciple and author of the epistle of Jude' },
  { id: 'simon', name: 'Simon the Zealot', description: 'Disciple who was a former member of the Zealot party' },
  { id: 'matthias', name: 'Matthias', description: 'Chosen to replace Judas Iscariot as one of the twelve apostles' },
  { id: 'stephen', name: 'Stephen', description: 'First Christian martyr, full of faith and the Holy Spirit' },
  { id: 'barnabas', name: 'Barnabas', description: 'Encourager and missionary companion of Paul' },
  { id: 'timothy', name: 'Timothy', description: 'Young pastor and companion of Paul, recipient of pastoral letters' },
  { id: 'titus', name: 'Titus', description: 'Greek convert and trusted companion of Paul' },
  { id: 'philemon', name: 'Philemon', description: 'Slave owner who received a letter from Paul about Onesimus' },
  { id: 'silas', name: 'Silas', description: 'Prophet and missionary companion of Paul and Peter' },
  { id: 'apollos', name: 'Apollos', description: 'Eloquent speaker and teacher who was instructed by Priscilla and Aquila' },
  { id: 'priscilla', name: 'Priscilla', description: 'Wife of Aquila, teacher of Apollos, co-worker with Paul' },
  { id: 'aquila', name: 'Aquila', description: 'Husband of Priscilla, tentmaker and co-worker with Paul' },
  { id: 'lydia', name: 'Lydia', description: 'First European convert, seller of purple cloth' },
  { id: 'dorcas', name: 'Dorcas', description: 'Also called Tabitha, known for her good works and acts of charity' },
  { id: 'cornelius', name: 'Cornelius', description: 'Roman centurion, first Gentile to receive the Holy Spirit' },
  { id: 'eunice', name: 'Eunice', description: 'Mother of Timothy, woman of sincere faith' },
  { id: 'lois', name: 'Lois', description: 'Grandmother of Timothy, also a woman of sincere faith' },
  { id: 'phoebe', name: 'Phoebe', description: 'Deaconess and patron of Paul, mentioned in Romans 16' },
  { id: 'junias', name: 'Junias', description: 'Relative of Paul, outstanding among the apostles' },
  { id: 'andronicus', name: 'Andronicus', description: 'Relative of Paul, outstanding among the apostles' },
  { id: 'urbanus', name: 'Urbanus', description: 'Co-worker in Christ, mentioned in Romans 16' },
  { id: 'stachys', name: 'Stachys', description: 'Beloved friend of Paul, mentioned in Romans 16' },
  { id: 'ampliatus', name: 'Ampliatus', description: 'Beloved in the Lord, mentioned in Romans 16' },
  { id: 'apelles', name: 'Apelles', description: 'Approved in Christ, mentioned in Romans 16' },
  { id: 'aristobulus', name: 'Aristobulus', description: 'Household member mentioned in Romans 16' },
  { id: 'herodion', name: 'Herodion', description: 'Relative of Paul, mentioned in Romans 16' },
  { id: 'narcissus', name: 'Narcissus', description: 'Household member mentioned in Romans 16' },
  { id: 'tryphena', name: 'Tryphena', description: 'Woman who works hard in the Lord, mentioned in Romans 16' },
  { id: 'tryphosa', name: 'Tryphosa', description: 'Woman who works hard in the Lord, mentioned in Romans 16' },
  { id: 'persis', name: 'Persis', description: 'Woman who has worked hard in the Lord, mentioned in Romans 16' },
  { id: 'rufus', name: 'Rufus', description: 'Chosen in the Lord, mentioned in Romans 16' },
  { id: 'julia', name: 'Julia', description: 'Sister of Nereus, mentioned in Romans 16' },
  { id: 'nereus', name: 'Nereus', description: 'Sister of Julia, mentioned in Romans 16' },
  { id: 'olympas', name: 'Olympas', description: 'Saints mentioned in Romans 16' },
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-orange-800">Biblical Characters</h1>
          <p className="text-lg text-orange-700 max-w-2xl mx-auto">
            Explore the lives, stories, and lessons from the men and women of the Bible who shaped history and faith.
          </p>
        </div>
        
        {/* Search */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-orange-300 rounded-lg leading-5 bg-white/80 backdrop-blur-sm placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm shadow-lg"
                placeholder="Search characters by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Character Count */}
        <div className="text-center mb-6">
          <p className="text-orange-700 font-medium">
            {filteredCharacters.length} of {characters.length} characters found
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-orange-600">Loading characters...</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
            <ul className="divide-y divide-orange-200">
              {filteredCharacters.length > 0 ? (
                filteredCharacters.map((character) => (
                  <li key={character.id}>
                    <Link 
                      href={`/characters/${character.id}`}
                      className="block hover:bg-orange-50 transition-colors duration-200"
                    >
                      <div className="px-6 py-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-orange-800 truncate mb-2">
                              {character.name}
                            </h3>
                            <p className="text-orange-700 leading-relaxed">
                              {character.description}
                            </p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <svg className="h-5 w-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-6 py-12 text-center">
                  <div className="mx-auto h-16 w-16 text-orange-300 mb-4">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-orange-800 mb-2">No characters found</h3>
                  <p className="text-orange-600">
                    No characters match your search. Try a different search term.
                  </p>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
