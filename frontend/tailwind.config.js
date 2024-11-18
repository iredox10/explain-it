/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'play-fair': ['play fair'],
        'rubik': ['rubik'],
        'satisfy': ['satisfy'],
        'salsa': ['salsa']
      },
      colors:{
        'primary-color': '#04991C',
        'secondary-color': '#E2FFDD',
        'yellow': '#FFE70C'
      }
    },
  },
  plugins: [],
}

