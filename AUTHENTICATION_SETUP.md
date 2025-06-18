# Authentication Setup Guide

This guide will help you set up authentication for your Biblical Chatbot using NextAuth.js.

## 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:9899
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Google OAuth (Optional)
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# GitHub OAuth (Optional)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Email Provider (Optional - for magic link authentication)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourdomain.com

# Bible API
BIBLE_API_KEY=your-bible-api-key

# Database (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/biblical_chatbot"
```

## 2. Generate NextAuth Secret

Generate a secure secret for NextAuth:

```bash
openssl rand -base64 32
```

Or use an online generator and add it to your `.env.local` file.

## 3. Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:9899/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy the Client ID and Client Secret to your `.env.local` file

## 4. GitHub OAuth Setup (Optional)

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - Application name: "Biblical Chatbot"
   - Homepage URL: `http://localhost:9899`
   - Authorization callback URL: `http://localhost:9899/api/auth/callback/github`
4. Click "Register application"
5. Copy the Client ID and generate a Client Secret
6. Add both to your `.env.local` file

## 5. Email Provider Setup (Optional)

For magic link authentication, you can use Gmail:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use your Gmail address and the app password in your `.env.local` file

## 6. Database Setup

1. Set up a PostgreSQL database (local or cloud)
2. Update the `DATABASE_URL` in your `.env.local` file
3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

## 7. Bible API Setup

1. Sign up at [Bible API](https://bibleapi.co/) or similar service
2. Get your API key
3. Add it to your `.env.local` file

## 8. Start the Application

```bash
npm run dev
```

## 9. Test Authentication

1. Visit `http://localhost:9899`
2. Click "Sign In" in the navigation
3. Try different authentication methods:
   - Google OAuth (if configured)
   - GitHub OAuth (if configured)
   - Email magic link (if configured)

## Authentication Features

### Available Providers
- **Google OAuth**: One-click sign-in with Google account
- **GitHub OAuth**: One-click sign-in with GitHub account
- **Email Magic Link**: Passwordless authentication via email

### User Experience
- Beautiful sign-in page with orange theme
- User profile dropdown in navigation
- Automatic session management
- Secure sign-out functionality
- Error handling with helpful messages

### Security Features
- JWT-based sessions
- Secure environment variable handling
- CSRF protection
- Automatic session expiration
- Secure redirect handling

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**
   - Make sure your redirect URIs match exactly in OAuth provider settings
   - Check that `NEXTAUTH_URL` is set correctly

2. **"Configuration error"**
   - Verify all environment variables are set correctly
   - Check that `NEXTAUTH_SECRET` is properly generated

3. **Email not sending**
   - Verify email server settings
   - Check that app passwords are used (not regular passwords)
   - Ensure SMTP settings are correct

4. **Database connection issues**
   - Verify `DATABASE_URL` format
   - Check database server is running
   - Ensure database exists and is accessible

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Check the terminal for server errors
3. Verify all environment variables are set
4. Ensure all OAuth providers are properly configured

## Next Steps

After setting up authentication:
1. Configure your database and run migrations
2. Set up the Bible API
3. Test all features with authenticated users
4. Deploy to production with proper environment variables 