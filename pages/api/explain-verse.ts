import { NextApiRequest, NextApiResponse } from 'next';
import { verseExplanations, formatVerseExplanation } from '../../lib/biblicalKnowledge';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { verse } = req.query;

  if (!verse || typeof verse !== 'string') {
    return res.status(400).json({ error: 'Verse parameter is required' });
  }

  try {
    // Format the verse key (lowercase and normalize spaces)
    const verseKey = verse.toLowerCase().replace(/\s+/g, ' ').replace(/^\s*(\d+)\s+/g, '$1 ');
    
    // Find the explanation in our knowledge base
    const explanation = verseExplanations[verseKey as keyof typeof verseExplanations];
    
    if (!explanation) {
      return res.status(404).json({ 
        error: 'Explanation not found',
        suggestion: 'This verse might not be in our database yet.'
      });
    }

    // Format the explanation
    const formattedExplanation = formatVerseExplanation(explanation);
    
    return res.status(200).json({
      verse,
      explanation: formattedExplanation
    });

  } catch (error) {
    console.error('Error fetching verse explanation:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
