# Free APIs for Biblical Chatbot Application

This document lists all the free APIs you need to sign up for to make the Biblical Chatbot application fully functional.

## 🔑 Essential APIs (Required)

### 1. Bible API - api.bible
**URL**: https://api.bible/
**Cost**: Free tier available
**Rate Limits**: 1000 requests/day (free tier)
**What it provides**:
- Bible verse lookups
- Multiple translations (NIV, ESV, KJV, etc.)
- Verse references and cross-references
- Chapter and book information

**Sign up process**:
1. Visit https://api.bible/
2. Create a free account
3. Generate an API key
4. Add to your `.env.local` file as `BIBLE_API_KEY`

**Usage in app**:
- Verse explanations in chat
- Bible reader functionality
- Search results with verse text

### 2. NextAuth.js (Authentication)
**URL**: https://next-auth.js.org/
**Cost**: Completely free
**What it provides**:
- User authentication
- Multiple providers (Google, GitHub, Email)
- Session management
- JWT tokens

**Setup**:
1. Install: `npm install next-auth`
2. Configure providers in `.env.local`
3. Set up database for user storage

**Required environment variables**:
```env
NEXTAUTH_URL=http://localhost:9899
NEXTAUTH_SECRET=your-secret-key-here
```

## 🔐 Optional Authentication Providers

### Google OAuth (Free)
**URL**: https://console.cloud.google.com/
**Cost**: Free
**Setup**:
1. Create Google Cloud project
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add to `.env.local`:
```env
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
```

### GitHub OAuth (Free)
**URL**: https://github.com/settings/developers
**Cost**: Free
**Setup**:
1. Go to GitHub Settings > Developer settings
2. Create new OAuth App
3. Add to `.env.local`:
```env
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### Email Provider (Free with SMTP)
**Cost**: Free (using Gmail, Outlook, etc.)
**Setup**:
1. Configure SMTP settings
2. Add to `.env.local`:
```env
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourdomain.com
```

## 🗄️ Database (Free Options)

### PostgreSQL (Free hosting options)
**Options**:
1. **Supabase** (Recommended): https://supabase.com/
   - Free tier: 500MB database, 50MB bandwidth
   - Easy setup with Prisma
   - Built-in authentication

2. **Railway**: https://railway.app/
   - Free tier: $5 credit monthly
   - Easy PostgreSQL deployment

3. **Neon**: https://neon.tech/
   - Free tier: 3GB storage, 10GB transfer
   - Serverless PostgreSQL

4. **PlanetScale**: https://planetscale.com/
   - Free tier: 1GB storage, 1 billion reads/month
   - MySQL compatible

**Setup with Supabase**:
1. Create account at supabase.com
2. Create new project
3. Get connection string
4. Add to `.env.local`:
```env
DATABASE_URL="postgresql://username:password@host:port/database"
```

## 🎨 UI/UX APIs (Optional)

### Lucide Icons (Free)
**URL**: https://lucide.dev/
**Cost**: Completely free
**Setup**:
```bash
npm install lucide-react
```

### Heroicons (Free)
**URL**: https://heroicons.com/
**Cost**: Completely free
**Setup**:
```bash
npm install @heroicons/react
```

## 📊 Analytics (Optional)

### Vercel Analytics (Free)
**URL**: https://vercel.com/analytics
**Cost**: Free with Vercel hosting
**Setup**:
1. Deploy to Vercel
2. Enable analytics in dashboard
3. Add tracking code to app

### Google Analytics (Free)
**URL**: https://analytics.google.com/
**Cost**: Free tier available
**Setup**:
1. Create Google Analytics account
2. Get tracking ID
3. Add to app

## 🚀 Deployment (Free Options)

### Vercel (Recommended)
**URL**: https://vercel.com/
**Cost**: Free tier available
**Features**:
- Automatic deployments
- Built-in analytics
- Edge functions
- Free SSL certificates

### Netlify
**URL**: https://netlify.com/
**Cost**: Free tier available
**Features**:
- Continuous deployment
- Form handling
- Free SSL

## 📝 Complete Environment Setup

Create a `.env.local` file with all necessary variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth
NEXTAUTH_URL="http://localhost:9899"
NEXTAUTH_SECRET="your-secret-key-here"

# Bible API
BIBLE_API_KEY="your-bible-api-key-here"

# Authentication Providers (Optional)
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Email Provider (Optional)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@yourdomain.com"

# Environment
NODE_ENV="development"
```

## 🔧 Setup Checklist

### Phase 1: Essential APIs
- [ ] Sign up for Bible API (api.bible)
- [ ] Set up PostgreSQL database (Supabase recommended)
- [ ] Configure NextAuth.js
- [ ] Test basic functionality

### Phase 2: Authentication
- [ ] Set up Google OAuth (optional)
- [ ] Set up GitHub OAuth (optional)
- [ ] Configure email provider (optional)
- [ ] Test user registration/login

### Phase 3: Deployment
- [ ] Deploy to Vercel or Netlify
- [ ] Configure production environment variables
- [ ] Set up custom domain (optional)
- [ ] Enable analytics

### Phase 4: Monitoring
- [ ] Set up error tracking
- [ ] Configure usage analytics
- [ ] Monitor API rate limits
- [ ] Set up alerts

## 💰 Total Cost: $0

All the APIs and services listed above have free tiers that are sufficient for:
- Personal use
- Small to medium-sized applications
- Development and testing
- Educational projects

## 🚨 Important Notes

1. **Rate Limits**: Monitor your API usage to stay within free tier limits
2. **Data Storage**: Free database tiers have storage limits
3. **Backup**: Regularly backup your data
4. **Security**: Keep API keys secure and never commit them to version control
5. **Scaling**: Consider paid plans when you exceed free tier limits

## 🔗 Useful Resources

- [Bible API Documentation](https://api.bible/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

**Remember**: All these services offer generous free tiers that are perfect for getting started. You can always upgrade to paid plans as your application grows! 