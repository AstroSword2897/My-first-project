# Biblical Chatbot & Study Tool 3.0

A comprehensive web application for exploring the Bible, studying biblical characters, and getting AI-powered spiritual guidance with enhanced search capabilities, offline access, and user authentication.

## ✨ Features

- 📖 **Bible Reader**: Read and study the Bible with multiple translations and easy navigation
- 👥 **Biblical Characters**: Explore detailed biographies of key biblical figures
- 💬 **AI Chat**: Get answers to your biblical questions with our AI assistant (with appropriate disclaimers)
- 🔍 **Advanced Search**: Fuzzy search, autocomplete, and filters by book/category
- 📱 **PWA Support**: Install as a mobile app with offline capabilities
- 🔐 **User Authentication**: Secure login with Google, GitHub, or email
- 🎨 **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices

## 🚀 Recent Improvements

### AI Chat Limitations & Safety
- **Study Aid Disclaimers**: Clear messaging that AI is for educational purposes, not spiritual authority
- **Appropriate Boundaries**: Encourages consultation with pastors/mentors for personal guidance
- **Theological Accuracy**: Based on established biblical scholarship and "Experiencing God" principles

### Enhanced Search Experience
- **Fuzzy Search**: Handles typos and partial matches intelligently
- **Autocomplete**: Smart suggestions for Bible books, categories, and theological terms
- **Advanced Filters**: Filter by book, category (Law, Historical, Wisdom, Prophetic, Gospel, Epistle, Apocalyptic)
- **Quick Results**: Instant search results with "View All" option

### Offline Access (PWA)
- **Progressive Web App**: Install on mobile devices like a native app
- **Offline Capabilities**: Cache essential content for offline reading
- **App Shortcuts**: Quick access to Bible Reader, Search, and Characters
- **Mobile Optimized**: Touch-friendly interface and responsive design

### User Authentication & Data
- **Multiple Login Options**: Google, GitHub, or email authentication
- **Secure Sessions**: JWT-based authentication with NextAuth.js
- **User Preferences**: Save Bible version preferences, theme settings, and study notes
- **Study History**: Track your reading progress and search history

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **AI/ML**: @xenova/transformers, faiss-node for embeddings
- **Authentication**: NextAuth.js with multiple providers
- **Database**: Prisma ORM with PostgreSQL
- **UI Components**: Lucide React, Heroicons
- **API**: Bible API integration (api.bible)
- **PWA**: Service workers, manifest, offline caching
- **Search**: Fuzzy search algorithm with autocomplete
- **Logging**: Winston
- **Build Tools**: Webpack, Babel

## 📦 Installation

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- **Bible API Key**: Obtain a free API key from [api.bible](https://api.bible/) for verse lookup.

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/biblical-chatbot.git
   cd biblical-chatbot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Required
   BIBLE_API_KEY=your_bible_api_key_here
   
   # Authentication (Optional - for user accounts)
   NEXTAUTH_URL=http://localhost:9899
   NEXTAUTH_SECRET=your_nextauth_secret_here
   
   # Google OAuth (Optional)
   GOOGLE_ID=your_google_client_id
   GOOGLE_SECRET=your_google_client_secret
   
   # GitHub OAuth (Optional)
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   
   # Email Provider (Optional)
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your_email@gmail.com
   EMAIL_SERVER_PASSWORD=your_app_password
   EMAIL_FROM=noreply@yourdomain.com
   
   # Database (Optional - for user data)
   DATABASE_URL="postgresql://username:password@localhost:5432/biblical_chatbot"
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:9899](http://localhost:9899)

## 🔧 Configuration

### Bible API Setup
1. Visit [api.bible](https://api.bible/)
2. Create a free account
3. Generate an API key
4. Add the key to your `.env.local` file

### Authentication Setup (Optional)
1. **Google OAuth**: Create a project in Google Cloud Console
2. **GitHub OAuth**: Create an OAuth app in GitHub settings
3. **Email Provider**: Configure SMTP settings for email authentication

### Database Setup (Optional)
1. Install PostgreSQL
2. Create a database
3. Run Prisma migrations: `npx prisma migrate dev`

## 📱 PWA Installation

### Desktop
- Chrome/Edge: Click the install icon in the address bar
- Firefox: Click the install icon in the address bar

### Mobile
- **iOS Safari**: Tap the share button → "Add to Home Screen"
- **Android Chrome**: Tap the menu → "Add to Home Screen"

## 🔍 Search Features

### Fuzzy Search
- Handles typos and partial matches
- Example: "jhon 3:16" finds "John 3:16"
- "fath" suggests "faith", "father", etc.

### Autocomplete
- Bible book names
- Common theological terms
- Category suggestions

### Filters
- **By Book**: Select specific Bible books
- **By Category**: Law, Historical, Wisdom, Prophetic, Gospel, Epistle, Apocalyptic
- **Combined**: Use multiple filters together

## 🏗 Project Structure

```
biblical-chatbot/
├── components/           # Reusable UI components
│   ├── ChatInterface.tsx # AI chat with disclaimers
│   └── ...
├── pages/               # Application pages and API routes
│   ├── api/            # Backend API endpoints
│   │   ├── auth/       # Authentication routes
│   │   └── chat.ts     # AI chat endpoint
│   ├── bible/          # Bible reader pages
│   ├── characters/     # Character study pages
│   └── search.tsx      # Search functionality
├── src/
│   ├── components/     # Feature components
│   │   ├── Bible/      # Bible-related components
│   │   └── common/     # Shared components
│   ├── lib/           # Utility functions and services
│   └── types/         # TypeScript type definitions
├── public/
│   ├── manifest.json  # PWA manifest
│   └── icons/         # App icons
├── prisma/            # Database schema and migrations
├── styles/            # Global styles
└── next.config.js     # Next.js configuration
```

## 📜 Available Scripts

- `npm run dev` - Start development server (port 9899)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma generate` - Generate Prisma client
- `npx prisma migrate dev` - Run database migrations

## 🔒 Security & Privacy

### AI Chat Safety
- **Educational Purpose**: AI responses are for study aid only
- **No Spiritual Authority**: Always consult qualified spiritual leaders
- **Biblical Foundation**: Responses based on established scholarship
- **Clear Disclaimers**: Prominent warnings about AI limitations

### Data Protection
- **Secure Authentication**: JWT tokens with proper expiration
- **Privacy First**: Minimal data collection
- **Local Storage**: User preferences stored locally when possible
- **HTTPS Only**: All communications encrypted

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

### Development Guidelines
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Biblical Scholarship**: Based on established theological frameworks
- **Next.js**: The React Framework for Production
- **Tailwind CSS**: A utility-first CSS framework
- **NextAuth.js**: Complete authentication solution
- **@xenova/transformers**: JavaScript implementation of Transformers
- **Lucide React**: Beautiful hand-crafted SVG icons
- **Bible API**: Scripture data and translations

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/biblical-chatbot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/biblical-chatbot/discussions)
- **Email**: support@yourdomain.com

## 🔄 Version History

### v3.0.0 (Current)
- ✨ Enhanced search with fuzzy matching and filters
- 🔐 User authentication with NextAuth.js
- 📱 PWA support for offline access
- ⚠️ AI chat safety improvements and disclaimers
- 🎨 Improved UI/UX with better responsive design
- 🚀 Performance optimizations

### v2.0.0
- 📖 Bible reader with multiple translations
- 👥 Biblical character studies
- 💬 AI chat functionality
- 🔍 Basic search capabilities

### v1.0.0
- 🎯 Initial release with core Bible study features

---

**Note**: This application is designed as a study aid and should not replace pastoral care, spiritual counseling, or theological training. Always consult with qualified spiritual leaders for personal guidance.
