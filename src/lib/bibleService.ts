import axios from 'axios';

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  version?: string;
  bookNumber?: number;
}

export interface BiblePassage {
  reference: string;
  verses: BibleVerse[];
  text: string;
  version: string;
}

class BibleService {
  private apiKey: string;
  private baseUrl: string = 'https://api.scripture.api.bible/v1';
  private defaultVersion: string = 'de4e12af7f28f599-02'; // ESV

  constructor(apiKey: string = '') {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_BIBLE_API_KEY || '';
    if (!this.apiKey) {
      console.warn('No Bible API key provided. Some features may not work.');
    }
  }

  async getPassage(reference: string, version?: string): Promise<BiblePassage> {
    try {
      const bibleId = version || this.defaultVersion;
      const url = `${this.baseUrl}/bibles/${bibleId}/search?query=${encodeURIComponent(reference)}`;
      
      const response = await axios.get(url, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });

      // Process and format the response
      return this.formatPassageResponse(response.data, reference, version || 'ESV');
    } catch (error) {
      console.error('Error fetching Bible passage:', error);
      throw new Error('Failed to fetch Bible passage. Please check your internet connection and try again.');
    }
  }

  private formatPassageResponse(data: any, reference: string, version: string): BiblePassage {
    // This is a simplified version - you'll need to adjust based on the actual API response
    if (!data || !data.data || !data.data.verses) {
      throw new Error('Invalid response format from Bible API');
    }

    const verses: BibleVerse[] = data.data.verses.map((verse: any) => ({
      book: reference.split(' ')[0],
      chapter: parseInt(reference.split(' ')[1] || '1'),
      verse: parseInt(verse.verse || '1'),
      text: verse.text || '',
      version
    }));

    return {
      reference,
      verses,
      text: verses.map(v => v.text).join(' '),
      version
    };
  }
}

// Export a singleton instance
export const bibleService = new BibleService();
