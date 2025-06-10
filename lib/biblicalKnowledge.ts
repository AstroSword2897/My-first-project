// Core theological frameworks and interfaces
export interface ExperiencingGodPrinciples {
  godsActivity: {
    description: string;
    scripturalBasis: string[];
    application: string;
  };
  loveRelationship: {
    description: string;
    scripturalBasis: string[];
    application: string;
  };
  divineInvitation: {
    description: string;
    scripturalBasis: string[];
    application: string;
  };
  crisisOfBelief: {
    description: string;
    scripturalBasis: string[];
    application: string;
  };
  adjustment: {
    description: string;
    scripturalBasis: string[];
    application: string;
  };
  obedience: {
    description: string;
    scripturalBasis: string[];
    application: string;
  };
}

export interface VerseExplanation {
  reference: string;
  text: string;
  context: {
    historical: string;
    literary: string;
    theological: string;
    godsActivity?: string; // How God is at work in this passage
  };
  exegesis: {
    originalLanguage: {
      hebrew?: string;
      greek?: string;
      transliteration: string;
      meaning: string;
    };
    literaryDevices: string[];
    structure: string;
  };
  interpretation: {
    literal: string;
    theological: string;
    practical: string;
    godsInvitation?: string; // God's specific invitation in this passage
  };
  application: {
    personal: string[];
    communal: string[];
    contemporary: string[];
    adjustmentsNeeded?: string[]; // Adjustments needed to join God's work
  };
  crossReferences: {
    ot: string[];
    nt: string[];
    theologicalThemes: string[];
  };
  furtherStudy: {
    questions: string[];
    resources: string[];
    blackabyInsights?: string[]; // Specific insights from Experiencing God
  };
  experiencingGod?: {
    godsActivity: string;
    invitation: string;
    crisisPoints: string[];
    requiredAdjustments: string[];
  };
}

interface BookMetadata {
  author: string;
  date: string;
  audience: string;
  purpose: string;
  keyThemes: string[];
  outline: string[];
  godsActivity?: string; // How God is at work in this book
  divineInvitations?: string[]; // Key divine invitations in the book
  crisisPoints?: string[]; // Major crises of belief in the book
  theologicalEmphases?: string[]; // Theological themes that align with Experiencing God
}

// Core principles from 'Experiencing God' by Henry Blackaby and Claude King
export const experiencingGodPrinciples: ExperiencingGodPrinciples = {
  godsActivity: {
    description: 'God is always at work around you, inviting you to join Him in His work.',
    scripturalBasis: ['John 5:17', 'John 5:19-20', 'John 14:10'],
    application: 'Develop spiritual sensitivity to recognize God\'s work in your life and world.'
  },
  loveRelationship: {
    description: 'God pursues a continuing love relationship with you that is real and personal.',
    scripturalBasis: ['John 15:15', '1 John 1:3', 'Revelation 3:20'],
    application: 'Prioritize your relationship with God above all else.'
  },
  divineInvitation: {
    description: 'God invites you to become involved with Him in His work.',
    scripturalBasis: ['John 17:18', 'Matthew 28:18-20', 'Acts 1:8'],
    application: 'Be open to God\'s invitations to join Him in His work.'
  },
  crisisOfBelief: {
    description: 'God\'s invitation will lead you to a crisis of belief that requires faith and action.',
    scripturalBasis: ['Hebrews 11:6', 'James 2:17', '2 Corinthians 5:7'],
    application: 'Be prepared to step out in faith when God calls.'
  },
  adjustment: {
    description: 'You must make major adjustments in your life to join God in what He is doing.',
    scripturalBasis: ['Genesis 12:1-4', 'Luke 5:1-11', 'Matthew 4:18-22'],
    application: 'Be willing to make necessary changes to follow God\'s leading.'
  },
  obedience: {
    description: 'You come to know God by experience as you obey Him, and He accomplishes His work through you.',
    scripturalBasis: ['John 14:21', '1 Samuel 15:22', 'John 2:5'],
    application: 'Obey God immediately and completely when He speaks.'
  }
};

export const bookMetadata: Record<string, BookMetadata> = {
  'genesis': {
    author: 'Traditionally attributed to Moses',
    date: '1445-1405 BC',
    audience: 'The Israelites during the Exodus',
    purpose: 'To reveal God as the Creator and Covenant-Maker, and to document the origins of God\'s chosen people',
    keyThemes: [
      'Creation and Fall',
      'The Flood',
      'Abrahamic Covenant',
      'Patriarchal Narratives'
    ],
    outline: [
      'Primeval History (1-11)',
      'Abraham (12-25)',
      'Isaac and Jacob (25-36)',
      'Joseph (37-50)'
    ],
    godsActivity: 'In Genesis, God is actively creating, judging, and establishing His covenant relationship with humanity through individuals like Noah, Abraham, Isaac, Jacob, and Joseph.',
    divineInvitations: [
      'God invites Adam and Eve to partner in caring for creation (1:28)',
      'God calls Abram to leave his country (12:1-3)',
      'God invites Jacob to return to Bethel (35:1)'
    ],
    crisisPoints: [
      'Adam and Eve\'s choice in the Garden',
      'Noah building the ark',
      'Abraham leaving Ur and later sacrificing Isaac',
      'Joseph forgiving his brothers'
    ],
    theologicalEmphases: [
      'God\'s sovereignty in human affairs',
      'The importance of faith and obedience',
      'God\'s faithfulness to His promises',
      'Redemption through testing and trials'
    ]
  },
  'matthew': {
    author: 'Matthew (Levi), a former tax collector and apostle',
    date: 'AD 50-70',
    audience: 'Jewish Christians and those familiar with Jewish customs',
    purpose: 'To present Jesus as the Jewish Messiah and King, the fulfillment of Old Testament prophecy',
    keyThemes: [
      'Jesus as Messiah',
      'Kingdom of Heaven',
      'Fulfillment of Prophecy',
      'Discipleship'
    ],
    outline: [
      'Birth and Early Life (1-2)',
      'Ministry in Galilee (3-18)',
      'Journey to Jerusalem (19-20)',
      'Passion Week (21-28)'
    ],
    godsActivity: 'In Matthew, God is actively fulfilling His redemptive plan through Jesus Christ, establishing His kingdom, and calling disciples to follow Him.',
    divineInvitations: [
      'Jesus calls the first disciples (4:18-22)',
      'The Great Commission (28:18-20)',
      'Invitation to the weary and burdened (11:28-30)'
    ],
    crisisPoints: [
      'Peter walking on water (14:22-33)',
      'The rich young ruler (19:16-22)',
      'Peter\'s denial (26:69-75)',
      'The Great Commission (28:16-20)'
    ],
    theologicalEmphases: [
      'The kingdom of heaven as present and future reality',
      'Righteousness that exceeds that of the Pharisees',
      'The cost of discipleship',
      'God\'s presence with His people (Immanuel)'
    ]
  }
  // Add more books as needed
};

export const verseExplanations: Record<string, VerseExplanation> = {
  '2 corinthians 9:6-7': {
    reference: '2 Corinthians 9:6-7 (NASB)',
    text: 'Now I say this: the one who sows sparingly will also reap sparingly, and the one who sows generously will also reap generously. Each one must do just as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver.',
    context: {
      historical: 'Paul is writing to the Corinthian church about their promised financial gift for the believers in Jerusalem who were experiencing hardship.',
      literary: 'This passage uses agricultural imagery (sowing and reaping) to illustrate spiritual principles of giving.',
      theological: 'The passage teaches that God honors and multiplies generous giving, and that the attitude behind the gift matters as much as the gift itself.'
    },
    exegesis: {
      originalLanguage: {
        greek: 'Τοῦτο δέ, ὁ σπείρων φειδομένως φειδομένως καὶ θερίσει, καὶ ἕκαστος καθὼς προαιρεῖται τῇ καρδίᾳ, μὴ ἐκ λύπης ἢ ἐξ ἀνάγκης, ἱλαρὸν γὰρ δότην ἀγαπᾷ ὁ θεός.',
        transliteration: 'Touto de, ho speirōn pheidomenōs pheidomenōs kai therisei, kai hekastos kathōs proaireitai tē kardia, mē ek lypēs ē ex anankēs, hilaron gar dotēn agapa ho theos.',
        meaning: 'The Greek emphasizes the principle of sowing and reaping, with the word "hilaron" (cheerful) giving us our English word "hilarious," suggesting God loves a joyfully generous giver.'
      },
      literaryDevices: ['Metaphor (sowing and reaping)', 'Parallelism', 'Contrast (sparingly vs. generously)'],
      structure: 'Paul presents a principle (v.6), an application (v.7a), and a reason (v.7b).'
    },
    interpretation: {
      literal: 'Paul is teaching that how much we give spiritually and materially affects what we receive back, and that God values the attitude of the heart in giving.',
      theological: 'This passage reveals God\'s economy where generosity is both commanded and rewarded, reflecting His own generous nature.',
      practical: 'Believers should give willingly and joyfully, not out of obligation, trusting God to provide and multiply their gifts.'
    },
    application: {
      personal: [
        'Examine your heart attitude when giving - is it cheerful or reluctant?',
        'Practice generosity in all areas of life, not just finances',
        'Trust God\'s promise to provide when you give generously'
      ],
      communal: [
        'Create a culture of cheerful giving in your faith community',
        'Be transparent about needs and how gifts are used',
        'Celebrate God\'s provision together'
      ],
      contemporary: [
        'In a materialistic culture, practice counter-cultural generosity',
        'Use financial resources to advance God\'s kingdom',
        'Teach biblical stewardship to the next generation'
      ]
    },
    crossReferences: {
      ot: ['Proverbs 11:24-25', 'Proverbs 22:9', 'Malachi 3:10'],
      nt: ['Luke 6:38', 'Acts 20:35', '2 Corinthians 8:1-15', 'Philippians 4:15-19'],
      theologicalThemes: ['Stewardship', 'Generosity', 'Faithfulness', 'Blessing']
    },
    furtherStudy: {
      questions: [
        'What does it mean to be a cheerful giver in practical terms?',
        'How can we balance wise financial planning with generous giving?',
        'What are some non-financial ways to practice generosity?'
      ],
      resources: [
        'The Treasure Principle by Randy Alcorn',
        'The Blessed Life by Robert Morris',
        'Counterfeit Gods by Timothy Keller'
      ]
    }
  },
  'john 6:40': {
    reference: 'John 6:40 (ESV)',
    text: '\"For this is the will of my Father, that everyone who looks on the Son and believes in him should have eternal life, and I will raise him up on the last day.\"',
    context: {
      historical: 'Jesus spoke these words after feeding the 5,000 and during the Passover season, a time when Jews remembered God\'s deliverance from Egypt.',
      literary: 'This verse is part of Jesus\' Bread of Life discourse, where He contrasts physical bread with the true bread from heaven.',
      theological: 'The verse encapsulates the gospel message, highlighting God\'s will, human responsibility, and Christ\'s role in salvation.'
    },
    exegesis: {
      originalLanguage: {
        greek: 'Τούτο γάρ έστιν τό θέλημα τοϋ Πατρός μου, ίνα πάς ό θεωρών τόν Υιόν καί πιστεύων εις αύτόν έχη ζωήν αίώνιον, καί άναστήσω αύτόν έγώ τή έσχάτη ημέρα.',
        transliteration: 'Touto gar estin to thelēma tou Patros mou, hina pas ho theōrōn ton Huion kai pisteuōn eis auton echē zōēn aiōnion, kai anastēsō auton egō tē eschatē hēmera.',
        meaning: 'The Greek emphasizes the ongoing nature of "believing" (present participle) and the certainty of the resurrection (future active indicative).'
      },
      literaryDevices: [
        'Chiasm: The verse follows an A-B-B\'\'-A\'\' pattern (will of Father - looks/believes - has eternal life - I will raise him)',
        'Inclusio: The phrase "eternal life" bookends the verse, emphasizing its importance'
      ],
      structure: 'The verse contains both a condition (looking and believing) and a promise (eternal life and resurrection).'
    },
    interpretation: {
      literal: 'Jesus is stating that God desires all who trust in Him to receive eternal life and be resurrected.',
      theological: 'This verse underscores monergism in salvation (God\'s initiative) and the necessity of faith in Christ alone.',
      practical: 'Believers can have assurance of salvation and future resurrection based on God\'s will and Christ\'s finished work.'
    },
    application: {
      personal: [
        'Examine the nature of your faith - is it a continual looking to and trusting in Christ?',
        'Find comfort in God\'s sovereign will for your salvation'
      ],
      communal: [
        'Proclaim this promise in evangelism',
        'Encourage fellow believers with the certainty of our future resurrection'
      ],
      contemporary: [
        'In a culture obsessed with self-salvation, emphasize God\'s initiative in salvation',
        'Address the fear of death with the hope of resurrection'
      ]
    },
    crossReferences: {
      ot: ['Numbers 21:8-9 (bronze serpent)', 'Isaiah 53:11 (justification by faith)'],
      nt: ['John 3:14-16', 'John 11:25-26', 'Romans 6:5', '1 Corinthians 15:20-23'],
      theologicalThemes: ['Election', 'Eternal Security', 'Resurrection', 'Saving Faith']
    },
    furtherStudy: {
      questions: [
        'How does this verse relate to the manna in the wilderness (John 6:31-35)?',
        'What does it mean to "look on the Son" in practical terms?',
        'How does Jesus\' statement challenge common misconceptions about God\'s will?'
      ],
      resources: [
        'Commentary on John by D.A. Carson',
        'The Gospel According to John by Leon Morris',
        'Knowing God by J.I. Packer (chapter on God\'s love)'
      ]
    }
  },
  '2 corinthians 7:2': {
    reference: '2 Corinthians 7:2 (ESV)',
    text: '\"Make room in your hearts for us. We have wronged no one, we have corrupted no one, we have taken advantage of no one.\"',
    context: {
      historical: 'Paul writes during his third missionary journey, addressing tensions after his "severe letter" (2 Cor 2:4).',
      literary: 'Part of Paul\'s defense of his apostolic ministry and appeal for reconciliation.',
      theological: 'Demonstrates the nature of authentic Christian leadership and relationships.'
    },
    exegesis: {
      originalLanguage: {
        greek: 'χωρήσατε ἡμᾶς· οὐδένα ἠδικήσαμεν, οὐδένα ἐφθείραμεν, οὐδένα ἐπλεονεκτήσαμεν.',
        transliteration: 'chōrēsate hēmas; oudenē edikēsamen, oudenē ephtheiramen, oudenē pleonektēsamen.',
        meaning: 'The triple negative (oudena) emphasizes the completeness of Paul\'s defense.'
      },
      literaryDevices: [
        'Tricolon: Three parallel negative statements for emphasis',
        'Metaphor: "Make room in your hearts" uses spatial language for relationship'
      ],
      structure: 'The verse contains an appeal followed by a threefold defense.'
    },
    interpretation: {
      literal: 'Paul asks the Corinthians to welcome him while defending his integrity.',
      theological: 'Highlights the importance of integrity in ministry and reconciliation in the body of Christ.',
      practical: 'Leaders must maintain integrity and be willing to address conflicts directly.'
    },
    application: {
      personal: [
        'Examine your relationships for any need of reconciliation',
        'Cultivate a heart that makes room for others'
      ],
      communal: [
        'Pursue reconciliation in the church',
        'Value integrity in leadership'
      ],
      contemporary: [
        'In a culture of distrust, model transparent relationships',
        'Address conflicts biblically rather than avoiding them'
      ]
    },
    crossReferences: {
      ot: ['Proverbs 4:23 (guarding the heart)'],
      nt: ['2 Corinthians 6:11-13', '2 Corinthians 12:14-18', '1 Thessalonians 2:1-12'],
      theologicalThemes: ['Reconciliation', 'Christian Leadership', 'Church Unity']
    },
    furtherStudy: {
      questions: [
        'What might have caused the Corinthians to close their hearts to Paul?',
        'How does Paul\'s defense model godly conflict resolution?',
        'What does it look like to "make room" for others in our hearts?'
      ],
      resources: [
        'The Message of 2 Corinthians by Paul Barnett',
        '2 Corinthians by Scott J. Hafemann',
        'The Peacemaker by Ken Sande'
      ]
    }
  }
};

export function formatVerseExplanation(explanation: VerseExplanation): string {
  let response = `# ${explanation.reference}\n\n`;
  response += `> ${explanation.text}\n\n`;
  
  // Context Section
  response += `## Context\n\n`;
  response += `**Historical:** ${explanation.context.historical}\n\n`;
  response += `**Literary:** ${explanation.context.literary}\n\n`;
  response += `**Theological:** ${explanation.context.theological}\n\n`;
  
  // Exegesis Section
  response += `## Exegesis\n\n`;
  if (explanation.exegesis.originalLanguage) {
    response += `### Original Language\n`;
    if (explanation.exegesis.originalLanguage.greek) {
      response += `- **Greek:** ${explanation.exegesis.originalLanguage.greek}\n`;
    }
    if (explanation.exegesis.originalLanguage.hebrew) {
      response += `- **Hebrew:** ${explanation.exegesis.originalLanguage.hebrew}\n`;
    }
    response += `- **Transliteration:** ${explanation.exegesis.originalLanguage.transliteration}\n`;
    response += `- **Meaning:** ${explanation.exegesis.originalLanguage.meaning}\n\n`;
  }
  
  if (explanation.exegesis.literaryDevices?.length) {
    response += `### Literary Devices\n`;
    explanation.exegesis.literaryDevices.forEach(device => {
      response += `- ${device}\n`;
    });
    response += '\n';
  }
  
  response += `### Structure\n${explanation.exegesis.structure}\n\n`;
  
  // Interpretation Section
  response += `## Interpretation\n\n`;
  response += `**Literal:** ${explanation.interpretation.literal}\n\n`;
  response += `**Theological:** ${explanation.interpretation.theological}\n\n`;
  response += `**Practical:** ${explanation.interpretation.practical}\n\n`;
  
  // Application Section
  response += `## Application\n\n`;
  
  if (explanation.application.personal?.length) {
    response += `### Personal\n`;
    explanation.application.personal.forEach(point => {
      response += `- ${point}\n`;
    });
    response += '\n';
  }
  
  if (explanation.application.communal?.length) {
    response += `### Communal\n`;
    explanation.application.communal.forEach(point => {
      response += `- ${point}\n`;
    });
    response += '\n';
  }
  
  if (explanation.application.contemporary?.length) {
    response += `### Contemporary Relevance\n`;
    explanation.application.contemporary.forEach(point => {
      response += `- ${point}\n`;
    });
    response += '\n';
  }
  
  // Cross References
  if (explanation.crossReferences) {
    response += `## Cross References\n\n`;
    if (explanation.crossReferences.ot?.length) {
      response += `**Old Testament:** ${explanation.crossReferences.ot.join(', ')}\n\n`;
    }
    if (explanation.crossReferences.nt?.length) {
      response += `**New Testament:** ${explanation.crossReferences.nt.join(', ')}\n\n`;
    }
    if (explanation.crossReferences.theologicalThemes?.length) {
      response += `**Theological Themes:** ${explanation.crossReferences.theologicalThemes.join(', ')}\n\n`;
    }
  }
  
  // Further Study
  if (explanation.furtherStudy) {
    response += `## Further Study\n\n`;
    
    if (explanation.furtherStudy.questions?.length) {
      response += `### Reflection Questions\n`;
      explanation.furtherStudy.questions.forEach((question, i) => {
        response += `${i + 1}. ${question}\n`;
      });
      response += '\n';
    }
    
    if (explanation.furtherStudy.resources?.length) {
      response += `### Recommended Resources\n`;
      explanation.furtherStudy.resources.forEach(resource => {
        response += `- ${resource}\n`;
      });
    }
  }
  
  return response;
}

export function getBookMetadata(bookName: string) {
  const normalizedBookName = bookName.toLowerCase().trim();
  return bookMetadata[normalizedBookName] || null;
}
