# Biblical Chatbot & Study Tool 3.0

A comprehensive web application for exploring the Bible, studying biblical characters, and getting AI-powered spiritual guidance.

## Features

- 📖 **Bible Reader**: Read and study the Bible with multiple translations and easy navigation
- 👥 **Biblical Characters**: Explore detailed biographies of key biblical figures
- 💬 **AI Chat**: Get answers to your biblical questions with our AI assistant
- 🔍 **Search**: Quickly find verses and passages across the Bible
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **AI/ML**: @xenova/transformers, faiss-node
- **UI Components**: Lucide React
- **Logging**: Winston
- **Build Tools**: Webpack, Babel
- **Linting/Formatting**: ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- **Bible API Key**: Obtain a free API key from [api.bible](https://api.bible/) for verse lookup.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/biblical-chatbot.git
   cd biblical-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:9899](http://localhost:9899) in your browser.

## Environment Variables

Create a `.env.local` file in the root of your project and add the following:

```
BIBLE_API_KEY=YOUR_API_KEY_HERE
```

Replace `YOUR_API_KEY_HERE` with the actual API key you obtained from [api.bible](https://api.bible/).

## Project Structure

```
biblical-chatbot/
├── components/         # Reusable UI components
├── pages/             # Application pages
├── public/            # Static files
├── src/               # Source files
│   ├── components/    # Feature components
│   ├── lib/           # Utility functions
│   └── types/         # TypeScript type definitions
├── styles/            # Global styles
├── next.config.js     # Next.js configuration
├── package.json       # Project dependencies
└── tsconfig.json     # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start the development server (runs on port 9899)
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [@xenova/transformers](https://github.com/xenova/transformers.js) - JavaScript implementation of Transformers
- [Lucide React](https://lucide.dev/) - Beautiful hand-crafted SVG icons
