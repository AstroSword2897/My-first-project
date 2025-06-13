export interface BiblicalCharacter {
  id: string;
  name: string;
  nameMeaning?: string;
  alternateNames?: string[];
  gender?: 'male' | 'female';
  tribe?: string;
  father?: string;
  mother?: string;
  spouse?: string | string[];
  children?: string[];
  significantEvents: CharacterEvent[];
  keyVerses: CharacterVerseReference[];
  timeline: CharacterTimelineEvent[];
  summary: string;
  historicalContext?: string;
  lessons?: string[];
  images?: string[];
}

interface CharacterEvent {
  title: string;
  description: string;
  reference: string;
  significance: string;
}

interface CharacterVerseReference {
  reference: string;
  text: string;
  significance: string;
  culturalContext?: {
    then: string;
    now: string;
  };
}

interface CharacterTimelineEvent {
  title: string;
  year?: number;
  relativeTime?: string;
  description: string;
  reference: string;
}
