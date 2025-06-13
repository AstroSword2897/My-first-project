// Bible types
export interface BibleBook {
  name: string;
  chapters: number;
  testament: 'old' | 'new';
  abbreviation: string;
  bookNumber: number;
}

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
  verse?: number;
  endVerse?: number;
}

export interface BibleSearchResult {
  reference: string;
  text: string;
  book: string;
  chapter: number;
  verse: number;
}

export interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
  translation: string;
}
