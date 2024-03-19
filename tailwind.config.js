/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'dark-100': '#222222',
        'dark-200': '#161616',
        'dark-300': '#3F3F3F',
        'dark-300-light': '#4E4E4E',
        'dark-300-active': '#999999',
        'dark-400': '#1E1E1E',
        'primary-red': '#A42B2B',
        'light-100': '#CBCBCB',
        'light-200': '#D8D8D8',
        'light-300': '#7B7B7B',
      },
      fontFamily: {
        'roboto': ["Roboto", 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

