/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-father': 'linear-gradient(to bottom right, #1d4ed8, #3b82f6)', // Blue gradient
        'gradient-son': 'linear-gradient(to bottom right, #b91c1c, #ef4444)',   // Red gradient
        'gradient-spirit': 'linear-gradient(to bottom right, #ca8a04, #eab308)', // Yellow/Gold gradient
        'gradient-background': 'linear-gradient(to bottom, #1a202c, #2d3748)', // Subtle dark gradient for overall background
      },
    },
  },
  plugins: [],
}
