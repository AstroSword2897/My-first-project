# Biblical Chatbot & Spiritual Journal

A comprehensive Next.js application that combines AI-powered biblical guidance with spiritual journaling, emotional well-being tracking, and prayer request management. All data is stored in PostgreSQL for persistence and analytics.

## 🌟 Features

### 🤖 AI Biblical Chatbot
- **Intelligent Responses**: AI-powered responses to spiritual questions and biblical inquiries
- **Verse Explanations**: Detailed explanations of Bible verses with context and cross-references
- **Topic-Based Guidance**: Biblical advice on life situations, relationships, and spiritual growth
- **Encouraging Tone**: Supportive and uplifting responses focused on spiritual encouragement

### 📖 Bible Study Tools
- **Verse Search**: Search and explore Bible verses with detailed explanations
- **Character Studies**: Learn about biblical characters and their life lessons
- **Thematic Exploration**: Study biblical themes across different books and passages
- **Cross-References**: Discover related verses and passages

### 📝 Spiritual Journal
- **Daily Reflections**: Write personal reflections on Bible verses and spiritual experiences
- **Markdown Editor**: Rich text editing with markdown support for detailed journaling
- **Verse Integration**: Link journal entries to specific Bible verses
- **Character Connections**: Connect reflections to biblical characters and their stories

### 😊 Emotional Well-Being Tracking
- **Mood Rating**: 1-10 scale emotional state tracking
- **Feelings Selection**: Choose from a comprehensive list of emotions
- **Detailed Descriptions**: Write detailed descriptions of emotional experiences
- **Contributing Factors**: Identify triggers and contributing factors
- **AI-Generated Prayers**: Personalized prayers based on emotional state
- **Progress Tracking**: Monitor emotional well-being over time

### 🙏 Prayer Request Management
- **Private & Public Requests**: Create private or shareable prayer requests
- **Answer Tracking**: Mark prayers as answered with details
- **Community Support**: Share prayer requests with the community
- **Prayer History**: Track prayer requests and their outcomes

### 💾 Comprehensive Data Storage
All application data is stored in PostgreSQL with the following features:

#### User Management
- User profiles with email, name, and profile images
- Authentication and session management
- User preferences and settings

#### Chat Messages
- Complete chat history with user and bot messages
- Message categorization (guidance, prayer, reflection, study)
- Verse references and tags
- Timestamp tracking and favorites

#### Journal Entries
- Rich text journal entries with markdown support
- Verse and character associations
- Tags and categorization
- Emotional state integration
- Prayer and reflection sections

#### Emotional States
- Detailed emotional tracking with ratings
- Feelings and triggers documentation
- AI-generated prayers based on emotional state
- Historical emotional well-being data

#### Bible Verses
- Complete Bible verse database
- Multiple translations support
- Cross-references and related verses
- User notes and highlights

#### Prayer Requests
- Private and public prayer requests
- Answer tracking and updates
- Community sharing capabilities
- Prayer history and outcomes

#### Search History
- User search queries and results
- Search analytics and patterns
- Personalized search suggestions

#### Analytics & Usage Tracking
- Comprehensive usage analytics
- Feature usage tracking
- User behavior insights
- Performance monitoring

## 🗄️ Database Schema

The application uses a comprehensive PostgreSQL schema with the following main models:

### Core Models
- **User**: User profiles and authentication
- **BibleVerse**: Bible verse content and metadata
- **ChatMessage**: AI chat interactions and responses
- **JournalEntry**: Spiritual journal entries and reflections
- **EmotionalState**: Emotional well-being tracking data
- **PrayerRequest**: Prayer requests and community sharing
- **UserNote**: Personal notes and highlights on verses
- **FavoriteVerse**: User's favorite Bible verses
- **SearchHistory**: Search queries and results
- **ThematicStudy**: Thematic Bible study sessions
- **BiblicalCharacter**: Biblical character profiles and lessons
- **UsageAnalytics**: Application usage and analytics data

### Relationships
- Users have many chat messages, journal entries, and prayer requests
- Journal entries can have associated emotional states
- Bible verses can have user notes and favorites
- All data is properly indexed for optimal performance

## 🔌 API Endpoints

### Chat API (`/api/chat`)
- **POST**: Send messages to the AI chatbot
- **Features**: Message storage, usage analytics, verse integration

### Journal API (`/api/journal`)
- **POST**: Create new journal entries with emotional tracking
- **GET**: Retrieve user's journal entries
- **Features**: Emotional state integration, verse associations

### Prayer Requests API (`/api/prayer-requests`)
- **POST**: Create new prayer requests
- **GET**: Retrieve user's prayer requests
- **PUT**: Update prayer request status (answered, etc.)
- **Features**: Private/public sharing, answer tracking

### Bible API (`/api/explain-verse`)
- **POST**: Get detailed verse explanations
- **Features**: Cross-references, context, multiple translations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Docker (optional, for local database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd biblical-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/biblical_chatbot"
   NEXTAUTH_URL="http://localhost:9899"
   NEXTAUTH_SECRET="your-secret-key"
   BIBLE_API_KEY="your-bible-api-key"
   ```

4. **Set up the database**
   ```bash
   # Start PostgreSQL (if using Docker)
   docker-compose up -d
   
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:9899](http://localhost:9899)

## 🛠️ Development

### Database Management
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Generate new migration
npx prisma migrate dev --name migration-name
```

### Code Structure
```
├── components/          # React components
├── lib/                # Database and service files
├── pages/              # Next.js pages and API routes
├── prisma/             # Database schema and migrations
├── public/             # Static assets
├── styles/             # CSS and styling
└── types/              # TypeScript type definitions
```

### Key Components
- **ChatInterface**: AI chatbot interface with message history
- **SpiritualJournal**: Journal entry creation with emotional tracking
- **BibleReader**: Bible verse reading and study interface
- **PrayerRequests**: Prayer request management interface
- **DatabaseService**: Comprehensive database operations

## 📊 Data Analytics

The application includes comprehensive analytics tracking:

### Usage Analytics
- Chat message frequency and patterns
- Journal entry creation and emotional trends
- Prayer request patterns and answer rates
- Feature usage and user engagement

### Emotional Well-Being Insights
- Emotional state trends over time
- Trigger identification and patterns
- Prayer effectiveness correlation
- Well-being improvement tracking

### Spiritual Growth Metrics
- Bible study patterns and preferences
- Journal reflection depth and frequency
- Prayer life development
- Character study engagement

## 🔒 Privacy & Security

- **User Data**: All user data is stored securely in PostgreSQL
- **Authentication**: Secure user authentication and session management
- **Privacy Controls**: Users control privacy of prayer requests and journal entries
- **Data Encryption**: Sensitive data is encrypted in transit and at rest

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation for new features
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Bible API providers for verse data
- The open-source community for tools and libraries
- Contributors and users who provide feedback and suggestions

## 📞 Support

For support, questions, or feature requests:
- Open an issue on GitHub
- Check the documentation
- Review the FAQ section

---

**May this application help you grow in your faith and deepen your relationship with God! 🙏**
