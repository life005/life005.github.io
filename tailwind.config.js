/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
          "noto": ['Noto Sans', 'sans-serif']
      },
      colors: {
        "midnight": {
          50: "#D0D8FB",
          100: "#BDC8F9",
          200: "#8EA1F5",
          300: "#647EF2",
          400: "#3557ED",
          500: "#1439E1",
          600: "#102DB2",
          700: "#0C2388",
          800: "#081759",
          900: "#040C2F",
          950: "#020617"
        }
      }
      
  },
  },
  plugins: [require('tailwindcss-animated')],
}

