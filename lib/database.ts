import { PrismaClient } from '../generated/prisma';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database service functions
export class DatabaseService {
  // User operations
  static async createUser(data: { email: string; name?: string; image?: string }) {
    return await prisma.user.create({
      data,
    });
  }

  static async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  static async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        chatMessages: true,
        journalEntries: true,
        favoriteVerses: true,
        prayerRequests: true,
        emotionalStates: true,
        thematicStudies: true,
      },
    });
  }

  // Chat message operations
  static async createChatMessage(data: {
    userId: string;
    text: string;
    sender: 'user' | 'bot';
    messageType?: 'GUIDANCE' | 'PRAYER' | 'REFLECTION' | 'STUDY';
    verseReference?: string;
    verseId?: string;
    tags?: string[];
  }) {
    return await prisma.chatMessage.create({
      data,
    });
  }

  static async getChatMessages(userId: string, limit = 50) {
    return await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: limit,
      include: {
        verse: true,
      },
    });
  }

  // Journal entry operations
  static async createJournalEntry(data: {
    userId: string;
    verse?: string;
    character?: string;
    reflection: string;
    prayer?: string;
    tags?: string[];
  }) {
    return await prisma.journalEntry.create({
      data,
    });
  }

  static async getJournalEntries(userId: string, limit = 50) {
    return await prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: limit,
      include: {
        emotionalState: true,
      },
    });
  }

  // Emotional state operations
  static async createEmotionalState(data: {
    journalEntryId: string;
    userId: string;
    rating: number;
    feelings: string[];
    details: string;
    triggers: string[];
    aiGeneratedPrayer?: string;
  }) {
    return await prisma.emotionalState.create({
      data,
    });
  }

  // Bible verse operations
  static async createBibleVerse(data: {
    book: string;
    chapter: number;
    verse: number;
    text: string;
    version?: string;
  }) {
    return await prisma.bibleVerse.create({
      data,
    });
  }

  static async getBibleVerse(book: string, chapter: number, verse: number, version = 'NASB') {
    return await prisma.bibleVerse.findUnique({
      where: {
        book_chapter_verse_version: {
          book,
          chapter,
          verse,
          version,
        },
      },
    });
  }

  static async searchBibleVerses(query: string, limit = 20) {
    return await prisma.bibleVerse.findMany({
      where: {
        OR: [
          { text: { contains: query, mode: 'insensitive' } },
          { book: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: limit,
    });
  }

  // User note operations
  static async createUserNote(data: {
    userId: string;
    verseId: string;
    content: string;
    type?: 'HIGHLIGHT' | 'NOTE' | 'BOOKMARK';
  }) {
    return await prisma.userNote.create({
      data,
    });
  }

  static async getUserNotes(userId: string, verseId?: string) {
    return await prisma.userNote.findMany({
      where: {
        userId,
        ...(verseId && { verseId }),
      },
      include: {
        verse: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Favorite verse operations
  static async addFavoriteVerse(userId: string, verseId: string) {
    return await prisma.favoriteVerse.create({
      data: { userId, verseId },
      include: {
        verse: true,
      },
    });
  }

  static async removeFavoriteVerse(userId: string, verseId: string) {
    return await prisma.favoriteVerse.delete({
      where: {
        userId_verseId: { userId, verseId },
      },
    });
  }

  static async getFavoriteVerses(userId: string) {
    return await prisma.favoriteVerse.findMany({
      where: { userId },
      include: {
        verse: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Search history operations
  static async addSearchHistory(data: {
    userId: string;
    query: string;
    results: number;
  }) {
    return await prisma.searchHistory.create({
      data,
    });
  }

  static async getSearchHistory(userId: string, limit = 20) {
    return await prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  // Prayer request operations
  static async createPrayerRequest(data: {
    userId: string;
    title: string;
    content: string;
    isPrivate?: boolean;
  }) {
    return await prisma.prayerRequest.create({
      data,
    });
  }

  static async getPrayerRequests(userId: string, includePrivate = true) {
    return await prisma.prayerRequest.findMany({
      where: {
        userId,
        ...(includePrivate ? {} : { isPrivate: false }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async updatePrayerRequest(id: string, data: {
    isAnswered?: boolean;
    title?: string;
    content?: string;
  }) {
    return await prisma.prayerRequest.update({
      where: { id },
      data,
    });
  }

  // Thematic study operations
  static async createThematicStudy(data: {
    userId: string;
    theme: string;
    title: string;
    content: string;
    verses: string[];
    insights: string;
  }) {
    return await prisma.thematicStudy.create({
      data,
    });
  }

  static async getThematicStudies(userId: string) {
    return await prisma.thematicStudy.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Biblical character operations
  static async createBiblicalCharacter(data: {
    name: string;
    description: string;
    stories: string[];
    lessons: string;
    verses: string[];
    imageUrl?: string;
  }) {
    return await prisma.biblicalCharacter.create({
      data,
    });
  }

  static async getBiblicalCharacter(name: string) {
    return await prisma.biblicalCharacter.findUnique({
      where: { name },
    });
  }

  static async getAllBiblicalCharacters() {
    return await prisma.biblicalCharacter.findMany({
      orderBy: { name: 'asc' },
    });
  }

  // Analytics operations
  static async trackUsage(data: {
    userId?: string;
    action: string;
    details?: any;
    userAgent?: string;
    ipAddress?: string;
  }) {
    return await prisma.usageAnalytics.create({
      data: {
        ...data,
        details: data.details || undefined,
      },
    });
  }

  // Utility functions
  static async getDatabaseStats() {
    const [
      userCount,
      chatMessageCount,
      journalEntryCount,
      bibleVerseCount,
      prayerRequestCount,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.chatMessage.count(),
      prisma.journalEntry.count(),
      prisma.bibleVerse.count(),
      prisma.prayerRequest.count(),
    ]);

    return {
      users: userCount,
      chatMessages: chatMessageCount,
      journalEntries: journalEntryCount,
      bibleVerses: bibleVerseCount,
      prayerRequests: prayerRequestCount,
    };
  }
} 