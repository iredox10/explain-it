/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary-color': '#04991C',
        'secondary-color': '#E2FFDD',
        'yellow': '#FFE70C'
      }
    },
  },
  plugins: [],
}

