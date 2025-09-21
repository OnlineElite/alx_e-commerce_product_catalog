import lineClamp from '@tailwindcss/line-clamp'
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
        backColor : "#f8f9fa",
        secondColor : "#ff5252",
        mainColor : "#4a6de5"
      }
    }
  },
  plugins: [ lineClamp ],
}

