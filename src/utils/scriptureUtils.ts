import { BookInfo } from '@/types/bible';

export interface ScriptureContext {
  reference: string;
  text: string;
  context: {
    author: string;
    date: string;
    historicalSetting: string;
    literaryContext: string;
    theologicalSignificance: string;
    culturalContext: {
      then: string;
      now: string;
    };
    christConnection?: string;
  };
}

const BIBLE_BOOKS_INFO: Record<string, BookInfo> = {
  'genesis': { author: 'Traditionally Moses', date: '1445-1405 BC', theme: 'Beginnings' },
  'exodus': { author: 'Moses', date: '1445-1405 BC', theme: 'Redemption from Egypt' },
  // Add other books as needed
};

export function getScriptureContext(reference: string, text: string): ScriptureContext {
  const [bookChapterVerse, version] = reference.split(' ');
  const [book, chapterVerse] = bookChapterVerse.split(':');
  const [chapter, verse] = chapterVerse ? chapterVerse.split('-')[0].split('.') : [];
  
  const bookInfo = BIBLE_BOOKS_INFO[book.toLowerCase()] || {
    author: 'Unknown',
    date: 'Unknown',
    theme: 'Various'
  };

  // Default context - can be overridden by specific references
  const defaultContext: ScriptureContext = {
    reference,
    text,
    context: {
      author: bookInfo.author,
      date: bookInfo.date,
      historicalSetting: `Set in ${bookInfo.date} during ${bookInfo.theme}.`,
      literaryContext: 'This passage is part of a larger narrative about...',
      theologicalSignificance: 'This verse highlights important theological themes...',
      culturalContext: {
        then: 'In the ancient Near Eastern context...',
        now: 'In modern terms, this would be similar to...'
      },
      christConnection: 'This passage points to Christ by...'
    }
  };

  // Add specific contexts for well-known verses
  const specificContexts: Record<string, Partial<ScriptureContext['context']>> = {
    'john 3:16': {
      literaryContext: 'Part of Jesus\' conversation with Nicodemus about being "born again" (John 3:1-21).',
      theologicalSignificance: 'Summarizes the Gospel message of God\'s love and the gift of eternal life through faith in Jesus.',
      culturalContext: {
        then: 'In a culture where gods were often seen as distant and demanding, this reveals a personal, loving God.',
        now: 'In a world searching for meaning, this offers a personal relationship with the Creator.'
      },
      christConnection: 'Jesus Himself is speaking, explaining His mission to bring salvation.'
    },
    'exodus 3:10': {
      literaryContext: 'Part of God\'s call to Moses at the burning bush (Exodus 3:1-4:17).',
      theologicalSignificance: 'Demonstrates God\'s initiative in salvation and His use of human agents.',
      culturalContext: {
        then: 'In ancient Egypt, the Pharaoh was considered a living god with absolute power.',
        now: 'Like a whistleblower confronting a powerful corporation, Moses was called to challenge systemic injustice.'
      },
      christConnection: 'Foreshadows Christ, the greater deliverer who would free people from sin.'
    }
    // Add more specific contexts as needed
  };

  const lowerRef = reference.toLowerCase();
  const specificContext = Object.entries(specificContexts).find(([key]) => 
    lowerRef.startsWith(key.toLowerCase())
  )?.[1];

  return {
    ...defaultContext,
    context: {
      ...defaultContext.context,
      ...(specificContext || {})
    }
  };
}

export function formatScriptureWithContext(reference: string, text: string): string {
  const ctx = getScriptureContext(reference, text);
  return `
📖 *${reference}* (${ctx.context.date})
"${text}"

*Context:*
- *Author:* ${ctx.context.author}
- *Setting:* ${ctx.context.historicalSetting}
- *Literary Context:* ${ctx.context.literaryContext}
- *Theological Significance:* ${ctx.context.theologicalSignificance}

*Cultural Context:*
- *Then:* ${ctx.context.culturalContext.then}
- *Now:* ${ctx.context.culturalContext.now}

${ctx.context.christConnection ? `*Connection to Christ:* ${ctx.context.christConnection}\n` : ''}`;
}
