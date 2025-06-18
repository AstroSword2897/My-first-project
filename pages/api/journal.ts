import type { NextApiRequest, NextApiResponse } from 'next';
import { DatabaseService } from '../../lib/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json');

  // Handle different HTTP methods
  switch (req.method) {
    case 'POST':
      return handleCreateJournalEntry(req, res);
    case 'GET':
      return handleGetJournalEntries(req, res);
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      return res.status(405).json({ 
        error: `Method ${req.method} not allowed`,
        allowedMethods: ['POST', 'GET']
      });
  }
}

async function handleCreateJournalEntry(req: NextApiRequest, res: NextApiResponse) {
  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ 
          error: 'Invalid JSON in request body',
          details: e instanceof Error ? e.message : 'Unknown error'
        });
      }
    }

    // Validate required fields
    if (!body.userId || !body.reflection) {
      return res.status(400).json({ 
        error: 'userId and reflection are required fields',
        requiredFields: ['userId', 'reflection']
      });
    }

    const { userId, verse, character, reflection, prayer, tags, emotionalState } = body;

    // Create journal entry
    const journalEntry = await DatabaseService.createJournalEntry({
      userId,
      verse,
      character,
      reflection,
      prayer,
      tags: tags || [],
    });

    // Create emotional state if provided
    if (emotionalState && journalEntry.id) {
      try {
        await DatabaseService.createEmotionalState({
          journalEntryId: journalEntry.id,
          userId,
          rating: emotionalState.rating,
          feelings: emotionalState.feelings || [],
          details: emotionalState.details || '',
          triggers: emotionalState.triggers || [],
          aiGeneratedPrayer: emotionalState.aiGeneratedPrayer,
        });
      } catch (error) {
        console.error('Error creating emotional state:', error);
        // Don't fail the request if emotional state creation fails
      }
    }

    // Track usage analytics
    try {
      await DatabaseService.trackUsage({
        userId,
        action: 'journal_entry_created',
        details: {
          hasEmotionalState: !!emotionalState,
          hasVerse: !!verse,
          hasCharacter: !!character,
        },
        userAgent: req.headers['user-agent'],
        ipAddress: req.headers['x-forwarded-for'] as string || req.socket.remoteAddress,
      });
    } catch (error) {
      console.error('Error tracking usage:', error);
    }

    return res.status(201).json({ 
      success: true, 
      journalEntry,
      message: 'Journal entry created successfully' 
    });

  } catch (error) {
    console.error('Error creating journal entry:', error);
    return res.status(500).json({ 
      error: 'Failed to create journal entry',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function handleGetJournalEntries(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId, limit = '50' } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ 
        error: 'userId query parameter is required',
        requiredFields: ['userId']
      });
    }

    const limitNum = parseInt(limit as string, 10);
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({ 
        error: 'limit must be a number between 1 and 100',
        received: limit
      });
    }

    const journalEntries = await DatabaseService.getJournalEntries(userId, limitNum);

    return res.status(200).json({ 
      success: true, 
      journalEntries,
      count: journalEntries.length
    });

  } catch (error) {
    console.error('Error fetching journal entries:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch journal entries',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 