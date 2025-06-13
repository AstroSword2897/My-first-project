interface BaseCharacter {
  id: string;
  name: string;
  nameMeaning?: string;
  description: string;
  gender?: 'male' | 'female';
  tribe?: string;
  testament: 'old' | 'new';
  category: 'patriarch' | 'judge' | 'king' | 'prophet' | 'apostle' | 'disciple' | 'other';
}

const baseCharacters: BaseCharacter[] = [
  // Old Testament
  { id: 'adam', name: 'Adam', description: 'First man created by God', gender: 'male', testament: 'old', category: 'patriarch' },
  { id: 'eve', name: 'Eve', description: 'First woman created by God', gender: 'female', testament: 'old', category: 'patriarch' },
  { id: 'noah', name: 'Noah', description: 'Built the ark to survive the flood', gender: 'male', testament: 'old', category: 'patriarch' },
  { id: 'abraham', name: 'Abraham', description: 'Father of many nations, made a covenant with God', gender: 'male', testament: 'old', category: 'patriarch' },
  { id: 'isaac', name: 'Isaac', description: 'Son of Abraham, father of Jacob and Esau', gender: 'male', testament: 'old', category: 'patriarch' },
  { id: 'jacob', name: 'Jacob', description: 'Son of Isaac, father of the twelve tribes of Israel', gender: 'male', testament: 'old', category: 'patriarch' },
  { id: 'joseph', name: 'Joseph', description: 'Son of Jacob, sold into slavery but rose to power in Egypt', gender: 'male', testament: 'old', category: 'patriarch' },
  { id: 'moses', name: 'Moses', description: 'Led the Israelites out of Egypt, received the Ten Commandments', gender: 'male', testament: 'old', category: 'prophet' },
  { id: 'joshua', name: 'Joshua', description: 'Successor to Moses, led Israelites into the Promised Land', gender: 'male', testament: 'old', category: 'judge' },
  { id: 'samson', name: 'Samson', description: 'Nazirite judge with supernatural strength', gender: 'male', testament: 'old', category: 'judge' },
  { id: 'samuel', name: 'Samuel', description: 'Prophet who anointed the first two kings of Israel', gender: 'male', testament: 'old', category: 'prophet' },
  { id: 'david', name: 'David', description: 'Second king of Israel, man after God\'s own heart', gender: 'male', testament: 'old', category: 'king' },
  { id: 'solomon', name: 'Solomon', description: 'Son of David, wisest king who built the first Temple', gender: 'male', testament: 'old', category: 'king' },
  { id: 'elijah', name: 'Elijah', description: 'Prophet who confronted the prophets of Baal', gender: 'male', testament: 'old', category: 'prophet' },
  { id: 'elisha', name: 'Elisha', description: 'Successor to Elijah, performed many miracles', gender: 'male', testament: 'old', category: 'prophet' },
  { id: 'isaiah', name: 'Isaiah', description: 'Major prophet who foretold the coming Messiah', gender: 'male', testament: 'old', category: 'prophet' },
  { id: 'jeremiah', name: 'Jeremiah', description: 'Weeping prophet who warned of Jerusalem\'s destruction', gender: 'male', testament: 'old', category: 'prophet' },
  { id: 'daniel', name: 'Daniel', description: 'Prophet who interpreted dreams and survived the lions\' den', gender: 'male', testament: 'old', category: 'prophet' },
  { id: 'esther', name: 'Esther', description: 'Jewish queen who saved her people from destruction', gender: 'female', testament: 'old', category: 'other' },
  
  // New Testament
  { id: 'john-baptist', name: 'John the Baptist', description: 'Prophet who prepared the way for Jesus', gender: 'male', testament: 'new', category: 'prophet' },
  { id: 'mary', name: 'Mary', description: 'Mother of Jesus', gender: 'female', testament: 'new', category: 'other' },
  { id: 'joseph-husband-of-mary', name: 'Joseph (Husband of Mary)', description: 'Earthly father of Jesus', gender: 'male', testament: 'new', category: 'other' },
  { id: 'peter', name: 'Peter', description: 'Apostle, leader of the early church', gender: 'male', testament: 'new', category: 'apostle' },
  { id: 'john', name: 'John', description: 'Apostle, author of the Gospel of John', gender: 'male', testament: 'new', category: 'apostle' },
  { id: 'paul', name: 'Paul', description: 'Apostle to the Gentiles, author of many New Testament letters', gender: 'male', testament: 'new', category: 'apostle' },
  { id: 'james', name: 'James', description: 'Brother of Jesus, leader of the Jerusalem church', gender: 'male', testament: 'new', category: 'disciple' },
  { id: 'thomas', name: 'Thomas', description: 'Apostle known for doubting Jesus\' resurrection', gender: 'male', testament: 'new', category: 'apostle' },
  { id: 'luke', name: 'Luke', description: 'Author of the Gospel of Luke and Acts', gender: 'male', testament: 'new', category: 'disciple' },
  { id: 'mark', name: 'Mark', description: 'Author of the Gospel of Mark', gender: 'male', testament: 'new', category: 'disciple' },
  { id: 'mary-magdalene', name: 'Mary Magdalene', description: 'Follower of Jesus, first witness to the resurrection', gender: 'female', testament: 'new', category: 'disciple' },
  { id: 'martha', name: 'Martha', description: 'Sister of Mary and Lazarus, friend of Jesus', gender: 'female', testament: 'new', category: 'disciple' },
  { id: 'lazarus', name: 'Lazarus', description: 'Brother of Mary and Martha, raised from the dead by Jesus', gender: 'male', testament: 'new', category: 'disciple' },
];

// Convert to the full BiblicalCharacter type with default values
const characters = baseCharacters.map(char => ({
  ...char,
  nameMeaning: '',
  alternateNames: [],
  spouse: '',
  children: [],
  significantEvents: [],
  keyVerses: [],
  timeline: [],
  summary: char.description,
  historicalContext: '',
  lessons: [],
  images: []
}));

// Generate the output
const output = `import { BiblicalCharacter } from '@/types/characters';

export const MOCK_CHARACTERS: Record<string, BiblicalCharacter> = ${JSON.stringify(
  characters.reduce((acc, char) => ({
    ...acc,
    [char.id]: char
  }), {} as Record<string, any>),
  null,
  2
)};

export const CHARACTER_IDS = ${JSON.stringify(characters.map(c => c.id))};`;

console.log(output);

// To save to file:
// import { writeFileSync } from 'fs';
// writeFileSync('./src/data/characters.ts', output);
