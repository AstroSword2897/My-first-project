import axios from 'axios';

interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  version?: string;
}

interface BiblePassage {
  reference: string;
  verses: BibleVerse[];
  text: string;
  version: string;
}

class BibleService {
  private apiKey: string;
  private baseUrl: string = 'https://api.scripture.api.bible/v1';
  private defaultVersion: string = 'de4e12af7f28f599-02'; // ESV

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Bible API key is required');
    }
    this.apiKey = apiKey;
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
      throw new Error('Failed to fetch Bible passage');
    }
  }

  private formatPassageResponse(data: any, reference: string, version: string): BiblePassage {
    // This is a simplified version - actual implementation would parse the API response
    // and format it into a consistent structure
    return {
      reference,
      version,
      text: data.data?.passages?.[0]?.content || '',
      verses: data.data?.verses?.map((v: any) => ({
        book: v.bookId,
        chapter: v.chapterId,
        verse: v.verseId,
        text: v.text,
        version
      })) || []
    };
  }

  async searchBible(query: string, version?: string): Promise<BiblePassage[]> {
    try {
      const bibleId = version || this.defaultVersion;
      const url = `${this.baseUrl}/bibles/${bibleId}/search?query=${encodeURIComponent(query)}`;
      
      const response = await axios.get(url, {
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });

      return response.data.data?.verses?.map((verse: any) => ({
        reference: `${verse.reference}`,
        version: version || 'ESV',
        text: verse.text,
        verses: [{
          book: verse.bookId,
          chapter: verse.chapterId,
          verse: verse.verseId,
          text: verse.text,
          version: version || 'ESV'
        }]
      })) || [];
    } catch (error) {
      console.error('Error searching Bible:', error);
      return [];
    }
  }
}

// Initialize with environment variable
const bibleApiKey = process.env.BIBLE_API_KEY || '';
const bibleService = new BibleService(bibleApiKey);

export { bibleService, BibleService };
export type { BiblePassage, BibleVerse };
