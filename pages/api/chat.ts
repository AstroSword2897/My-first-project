import type { NextApiRequest, NextApiResponse } from 'next';
import { verseExplanations, formatVerseExplanation, type VerseExplanation } from '../../lib/biblicalKnowledge';
import { bibleService, type BiblePassage } from '../../lib/bibleService';

// Define a type for the response structure
type ChatResponse = {
  response: string;
  verses?: string[];
};

// Type for biblical knowledge entries
type BiblicalKnowledgeEntry = {
  response: string;
  verses?: string[];
};

// Common verses to suggest
const encouragingVerses = [
  'Jeremiah 29:11 - "For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."',
  'Romans 8:28 - And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
  'Philippians 4:6-7 - Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
  'Isaiah 41:10 - So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.',
  'Psalm 23:1-3 - The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.'
];

// General biblical knowledge base
const biblicalKnowledge: Record<string, BiblicalKnowledgeEntry> = {
  // Greetings
  'hello': {
    response: 'Peace be with you! I\'m here to provide biblical guidance. You can ask me about specific verses, biblical principles, or seek spiritual advice. How may I assist you today?',
    verses: ['Numbers 6:24-26', '2 Thessalonians 3:16']
  },
  'hi': {
    response: 'Grace and peace to you! How can I help you explore God\'s Word today?',
    verses: ['1 Corinthians 1:3', 'Philippians 1:2']
  },
  'help': {
    response: 'I can help you with:\n- Explaining Bible verses (e.g., "explain John 3:16")\n- Finding verses on topics (e.g., "verses about faith")\n- Biblical advice on life situations\n- Understanding biblical concepts\n\nWhat would you like to know?',
    verses: ['2 Timothy 3:16-17', 'Psalm 119:105']
  },
  // Common questions
  'how to be saved': {
    response: 'The Bible teaches that salvation comes through faith in Jesus Christ. Here\'s what the Bible says about being saved:\n\n1. Acknowledge that you are a sinner (Romans 3:23)\n2. Believe that Jesus died for your sins and rose again (Romans 10:9-10)\n3. Confess Jesus as your Lord and Savior (Romans 10:13)\n4. Repent of your sins (Acts 3:19)\n5. Follow Jesus in obedience (Matthew 16:24-25)\n\nWould you like to pray to receive Christ?',
    verses: ['Romans 10:9-10', 'Ephesians 2:8-9', 'John 3:16', 'Acts 16:31']
  },
  'how to pray': {
    response: 'Jesus taught us how to pray in Matthew 6:9-13 (The Lord\'s Prayer). Here are key elements of biblical prayer:\n\n1. Praise: Begin by acknowledging who God is\n2. Thanksgiving: Thank God for His blessings\n3. Confession: Acknowledge your sins\n4. Petition: Present your requests to God\n5. Intercession: Pray for others\n6. Submission: End by submitting to God\'s will\n\nRemember, prayer is a conversation with God - be honest and open with Him.',
    verses: ['Matthew 6:9-13', 'Philippians 4:6-7', '1 John 5:14-15']
  },
  'find a partner': {
    response: 'The Bible offers wisdom about finding a godly spouse:\n\n1. Seek God first (Matthew 6:33)\n2. Look for someone who loves God (2 Corinthians 6:14)\n3. Observe their character (Proverbs 31, 1 Timothy 3:1-13)\n4. Seek wisdom and counsel (Proverbs 19:20)\n5. Be the right person rather than just finding the right person\n6. Trust God\'s timing (Ecclesiastes 3:1)\n\nRemember, marriage is a sacred covenant, not just a contract.',
    verses: ['Proverbs 18:22', 'Proverbs 31:10-31', '1 Corinthians 7:39']
  },
  // Common verses
  'john 3:16': {
    response: 'John 3:16 (ESV): "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life."\n\nThis verse is often called "the gospel in a nutshell" because it summarizes God\'s plan of salvation. It shows that salvation is a gift of God\'s love, received through faith in Jesus Christ.',
    verses: ['John 3:16', 'Romans 5:8', '1 John 4:9-10']
  },
  'philippians 4:13': {
    response: 'Philippians 4:13 (ESV): "I can do all things through him who strengthens me."\n\nIn context, Paul is talking about being content in all circumstances through Christ who gives him strength. This verse reminds us that we can endure all things through Christ\'s power, not our own.',
    verses: ['Philippians 4:11-13', '2 Corinthians 12:9-10']
  },
  'proverbs 3:5-6': {
    response: 'Proverbs 3:5-6 (ESV): "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."\n\nThis passage teaches us to:\n1. Trust God completely (not partially)\n2. Rely on God\'s wisdom rather than our limited understanding\n3. Acknowledge God in every area of life\n4. Experience God\'s guidance as we submit to Him\n\nIt\'s a powerful reminder to depend on God in every decision and aspect of life.',
    verses: ['Proverbs 3:5-6', 'Psalm 37:5', 'James 1:5-6']
  },
  // Common questions
  'explain matthew 6:33': {
    response: 'Matthew 6:33 says: "But seek first his kingdom and his righteousness, and all these things will be given to you as well." This powerful verse teaches us about priorities. Jesus is instructing us to make God\'s kingdom and His righteousness our top priority. When we do this, God promises to provide for our needs. It\'s a call to trust in God\'s provision and focus on spiritual matters above material concerns.',
    verses: ['Matthew 6:33', 'Matthew 6:25-34']
  },
  'how should i pray': {
    response: 'Jesus taught us how to pray in Matthew 6:9-13, known as The Lord\'s Prayer. Here\'s a simple guide to prayer based on Jesus\' teaching:\n\n1. Start with worship: "Our Father in heaven, hallowed be your name"\n2. Submit to God\'s will: "Your kingdom come, your will be done"\n3. Present your requests: "Give us today our daily bread"\n4. Seek forgiveness: "Forgive us our debts, as we also have forgiven our debtors"\n5. Ask for protection: "Lead us not into temptation, but deliver us from the evil one"\n\nRemember, prayer is simply talking to God. Be honest, be yourself, and trust that He hears you.',
    verses: ['Matthew 6:9-13', 'Philippians 4:6-7', '1 Thessalonians 5:16-18']
  },
  'what is love': {
    response: 'The Bible provides the most profound definition of love in 1 Corinthians 13:4-7:\n\n"Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres."\n\nThis agape love is selfless, sacrificial, and unconditional - the same love that God demonstrates toward us (John 3:16).',
    verses: ['1 Corinthians 13:4-7', '1 John 4:7-12', 'John 3:16']
  },
  'what is faith': {
    response: 'The Bible defines faith in Hebrews 11:1: "Now faith is confidence in what we hope for and assurance about what we do not see."\n\nKey aspects of biblical faith include:\n\n1. Trusting in God\'s character and promises (Proverbs 3:5-6)\n2. Believing in what we cannot see (2 Corinthians 5:7)\n3. Acting on our belief (James 2:17)\n4. Being certain of God\'s faithfulness (Hebrews 10:23)\n\nFaith is not blind belief but confident trust in the trustworthy nature of God.',
    verses: ['Hebrews 11:1', '2 Corinthians 5:7', 'James 2:14-26', 'Ephesians 2:8-9']
  },
  'psalm 46:10': {
    response: 'Psalm 46:10 (NIV): "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth."\n\nThis powerful verse contains two key commands with profound implications for our spiritual lives:\n\n1. "Be still" - This Hebrew word (rapha) means to let go, release, or cease striving. It calls us to surrender our need to control and trust in God\'s sovereignty.\n\n2. "Know that I am God" - This is an invitation to recognize God\'s character and power. The name used for God here (Elohim) emphasizes His might and creative power.\n\nContext: This psalm was likely written during a time of national crisis, reminding God\'s people that He is their refuge and strength (v.1), even when the world seems to be in chaos (vv.2-3).\n\nKey Lessons:\n- God is in control, even in the midst of turmoil\n- Our first response to challenges should be to pause and acknowledge God\'s sovereignty\n- God\'s ultimate purpose is to be glorified in all the earth\n\nApplication: When facing anxiety or uncertainty, we can find peace by intentionally quieting our hearts before God, acknowledging His lordship, and trusting in His perfect plan.',
    verses: ['Psalm 46:10', 'Exodus 14:14', 'Isaiah 30:15', 'Mark 4:39-41']
  }
};


async function findBestResponse(message: string): Promise<ChatResponse> {
  const lowerMessage = message.toLowerCase().trim();
  
  // Check for verse explanations first (e.g., "explain 2 corinthians 7:2")
  const explainMatch = lowerMessage.match(/explain\s+([\w\s]+\s*\d+:\d+(?:-\d+)?)/i);
  if (explainMatch) {
    const verseRef = explainMatch[1].trim();
    
    try {
      // First try to find a custom explanation
      const verseKey = verseRef.toLowerCase().replace(/^(\d+)\s+/g, '$1 ');
      const verseExplanation = verseExplanations[verseKey as keyof typeof verseExplanations];
      
      if (verseExplanation) {
        return {
          response: formatVerseExplanation(verseExplanation),
          verses: [
            verseExplanation.reference,
            ...(verseExplanation.crossReferences?.ot || []),
            ...(verseExplanation.crossReferences?.nt || [])
          ]
        };
      }
      
      // If no custom explanation, fetch from Bible API
      const passage = await bibleService.getPassage(verseRef);
      if (passage?.text) {
        return {
          response: `**${verseRef} (${passage.version})**\n\n${passage.text}\n\n*Would you like me to explain this passage in more detail?*`,
          verses: [verseRef]
        };
      }
    } catch (error) {
      console.error('Error fetching Bible passage:', error);
      // Continue to next check if there's an error
    }
  }
  
  // Check for verse references (e.g., "John 3:16" or "matthew 6:1-5")
  const verseRefMatch = lowerMessage.match(/(\d?\s*[a-z]+\s*\d+:\d+(?:-\d+)?(?:,\s*\d+)?)/i);
  if (verseRefMatch) {
    const verseRef = verseRefMatch[1].trim();
    
    // First try to find in our knowledge base
    const verseKey = verseRef.toLowerCase().replace(/\s+/g, ' ');
    for (const [key, value] of Object.entries(biblicalKnowledge)) {
      if (key.includes(verseKey)) {
        return value;
      }
    }
    
    // If not found in knowledge base, try to fetch from API
    try {
      const passage = await bibleService.getPassage(verseRef);
      if (passage?.text) {
        return {
          response: `**${verseRef} (${passage.version})**\n\n${passage.text}\n\n*Would you like me to explain this passage in more detail?*`,
          verses: [verseRef]
        };
      }
    } catch (error) {
      console.error('Error fetching Bible verse:', error);
    }
  }
  
  // Check for exact matches in general knowledge
  for (const [key, value] of Object.entries(biblicalKnowledge)) {
    if (lowerMessage.includes(key)) {
      return value;
    }
  }
  
  // Check for common question patterns
  if (/how\s+(?:do|can|should)\s+i\s+(?:find|get|be)\s+a\s+(?:godly\s+)?(?:spouse|partner|husband|wife)/i.test(lowerMessage)) {
    const entry = biblicalKnowledge['find a partner'];
    if (entry) return entry;
  }
  
  if (/what(?:'s|\s+is|\s+does\s+the\s+bible\s+say\s+about)?\s+(?:pray|prayer)/i.test(lowerMessage)) {
    const entry = biblicalKnowledge['how to pray'];
    if (entry) return entry;
  }
  
  if (/(?:what(?:'s|\s+is)|define)\s+(?:biblical\s+)?(love|faith|hope|grace)/i.test(lowerMessage)) {
    const match = lowerMessage.match(/(love|faith|hope|grace)/i);
    if (match) {
      const term = match[1].toLowerCase();
      if (term === 'love') {
        const entry = biblicalKnowledge['what is love'];
        if (entry) return entry;
      }
      if (term === 'faith') {
        const entry = biblicalKnowledge['what is faith'];
        if (entry) return entry;
      }
    }
  }
  
  // Default response if no matches found
  return {
    response: `I'm here to provide biblical guidance. Could you please rephrase your question or ask about a specific Bible verse?`,
    verses: []
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Type guard to ensure message exists and is a string
    if (!req.body || typeof req.body !== 'object' || !('message' in req.body)) {
      return res.status(400).json({ error: 'Message is required in the request body' });
    }
    const { message } = req.body as { message: string };
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get the best response for the message
    const result = await findBestResponse(message);
    const response = result.response;
    const verses = Array.isArray(result.verses) ? result.verses : [];
    
    // Format the response with verses if available
    let formattedResponse = response;
    if (verses.length > 0) {
      formattedResponse += '\n\nRelated verses: ' + 
        verses.map(verse => {
          // Convert verse references to clickable links
          const verseMatch = verse.match(/(.*?)\s*(\d+):(\d+)(?:-(\d+))?/);
          if (verseMatch) {
            const book = verseMatch[1] || '';
            const chapter = verseMatch[2] || '';
            const startVerse = verseMatch[3] || '';
            const endVerse = verseMatch[4];
            
            // Format the verse reference for display and URL
            const formattedBook = book.replace(/\s+/g, '+');
            const verseRef = endVerse 
              ? `${formattedBook}+${chapter}:${startVerse}-${endVerse}`
              : `${formattedBook}+${chapter}:${startVerse}`;
              
            const displayText = endVerse 
              ? `${book} ${chapter}:${startVerse}-${endVerse}`
              : `${book} ${chapter}:${startVerse}`;
              
            // Create a link to Bible Gateway with proper URL encoding
            const url = `https://www.biblegateway.com/passage/?search=${verseRef}&version=NIV`;
            return `[${displayText}](${url})`;
          }
          return verse;
        }).join(', ');
    }

    return res.status(200).json({ response: formattedResponse });
  } catch (error) {
    console.error('Error processing chat message:', error);
    return res.status(500).json({ 
      response: 'I apologize, but I encountered an error while processing your request. Please try again later.'
    });
  }
}
