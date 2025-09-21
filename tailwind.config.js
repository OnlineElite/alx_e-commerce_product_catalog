/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend : {
      colors : {
        footerColor : "#2d3436",
        mainColor : "#f8f9fa",
      }
    }
  },
  plugins: [],
}

