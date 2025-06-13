import { BiblicalCharacter } from '@/types/characters';

export const MOCK_CHARACTERS: Record<string, BiblicalCharacter> = {
  moses: {
    id: 'moses',
    name: 'Moses',
    nameMeaning: 'Drawn out of the water',
    gender: 'male',
    tribe: 'Levi',
    father: 'Amram',
    mother: 'Jochebed',
    spouse: 'Zipporah',
    children: ['Gershom', 'Eliezer'],
    summary: 'Moses was a Hebrew prophet, teacher and leader who delivered his people from Egyptian slavery. He led the Israelites out of Egypt and received the Ten Commandments from God on Mount Sinai.',
    significantEvents: [
      {
        title: 'Birth and Rescue',
        description: 'Moses was born during a time when the Pharaoh ordered all Hebrew baby boys to be killed. His mother placed him in a basket in the Nile River, where he was found and adopted by Pharaoh\'s daughter.',
        reference: 'Exodus 2:1-10',
        significance: 'Demonstrates God\'s providence in preserving Moses\' life.'
      },
      {
        title: 'The Burning Bush',
        description: 'God appeared to Moses in a burning bush and called him to lead the Israelites out of Egypt.',
        reference: 'Exodus 3:1-4:17',
        significance: 'Marked the beginning of Moses\' prophetic mission.'
      },
      {
        title: 'The Exodus',
        description: 'Moses led the Israelites out of Egypt after God sent ten plagues.',
        reference: 'Exodus 12:31-42',
        significance: 'The central redemptive event in the Old Testament.'
      }
    ],
    keyVerses: [
      {
        reference: 'Exodus 3:10',
        text: 'So now, go. I am sending you to Pharaoh to bring my people the Israelites out of Egypt.',
        significance: 'God calls Moses to lead the Israelites out of Egypt.',
        culturalContext: {
          then: 'In ancient Egypt, the Pharaoh was considered a living god with absolute power. For Moses, a Hebrew raised in Pharaoh\'s household, confronting him was an act of treason punishable by death.',
          now: 'Today, this would be like a former member of a powerful political family speaking out against systemic injustice, risking their social standing and safety.'
        }
      },
      {
        reference: 'Deuteronomy 34:10-12',
        text: 'Since then, no prophet has risen in Israel like Moses, whom the Lord knew face to face...',
        significance: 'A tribute to Moses\' unique relationship with God.',
        culturalContext: {
          then: 'In ancient Near Eastern cultures, kings were the only ones who could approach deities directly. For Moses to speak with God "face to face" elevated him above typical prophets in Israel\'s history.',
          now: 'This would be like having direct access to a world leader who personally guides and mentors you, a privilege rarely granted even to high-ranking officials.'
        }
      }
    ],
    timeline: [
      {
        title: 'Birth',
        year: -1526,
        description: 'Moses is born in Egypt during the enslavement of the Israelites.',
        reference: 'Exodus 2:1-2'
      },
      {
        title: 'The Exodus',
        year: -1446,
        description: 'Moses leads the Israelites out of Egypt after the ten plagues.',
        reference: 'Exodus 12:31-42'
      },
      {
        title: 'Receives the Law',
        year: -1446,
        description: 'Moses receives the Ten Commandments on Mount Sinai.',
        reference: 'Exodus 19-20'
      },
      {
        title: 'Death',
        year: -1406,
        description: 'Moses dies at age 120 on Mount Nebo after viewing the Promised Land.',
        reference: 'Deuteronomy 34:1-8'
      }
    ],
    historicalContext: 'Moses lived during the New Kingdom period of Egyptian history, likely during the 13th century BCE. The Exodus story is central to Jewish identity and has been interpreted in various ways by historians and archaeologists.',
    lessons: [
      'God can use anyone, regardless of their past or perceived inadequacies.',
      'True leadership requires humility and dependence on God.',
      'God is patient but also just in dealing with rebellion and unbelief.'
    ]
  }
  // Add more characters here
};

export const CHARACTER_IDS = Object.keys(MOCK_CHARACTERS);
