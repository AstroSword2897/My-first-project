export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  translation: string;
  bookNumber: number;
}

export interface BibleReference {
  book: string;
  chapter: number;
  startVerse: number;
  endVerse?: number;
}

export interface BookInfo {
  author: string;
  date: string;
  theme: string;
  keyThemes?: string[];
  historicalSetting?: string;
  literaryStyle?: 'narrative' | 'poetry' | 'prophecy' | 'epistle' | 'apocalyptic';
}

export interface BibleBook extends BookInfo {
  name: string;
  chapters: number;
  testament: 'old' | 'new';
  abbreviation: string;
  bookNumber: number;
  genre?: string;
  originalLanguage?: 'hebrew' | 'greek' | 'aramaic';
  originalAudience?: string;
  purpose?: string;
}

export interface BibleTranslation {
  id: string;
  name: string;
  language: string;
  description: string;
}
