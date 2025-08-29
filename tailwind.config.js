/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Inter', 'Poppins', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'mono': ['Roboto Mono', 'monospace'],
      },
      colors: {
        'forest-green': {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce5ca',
          300: '#8dd1a7',
          400: '#57b67d',
          500: '#339b5b',
          600: '#267d47',
          700: '#1f633a',
          800: '#1c4f30',
          900: '#1B4332',
        },
        'rich-gold': {
          50: '#fffef7',
          100: '#fffce8',
          200: '#fff8c5',
          300: '#fff197',
          400: '#ffe658',
          500: '#FFD700',
          600: '#e6c200',
          700: '#cc9900',
          800: '#b37700',
          900: '#996600',
        },
        'champagne': {
          50: '#fefdfb',
          100: '#fdfaf4',
          200: '#fbf4e6',
          300: '#F7E7CE',
          400: '#f0d5a8',
          500: '#e8c382',
          600: '#d4a853',
          700: '#b8903b',
          800: '#9a7530',
          900: '#7d5f28',
        },
        'charcoal': '#2D3748',
        'light-gray': '#F7FAFC',
        'success-green': '#48BB78',
        'warning-red': '#F56565',
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(255, 215, 0, 0.15)',
        'forest': '0 4px 14px 0 rgba(27, 67, 50, 0.15)',
        'luxury': '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'luxury': '12px',
      },
      backdropBlur: {
        'luxury': '20px',
      }
    },
  },
  plugins: [],
}