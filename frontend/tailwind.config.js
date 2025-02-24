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
        'salsa': ['salsa'],
        'saira' : ['saira stencil one']
      },
      colors:{
        'primary-color': '#04991C',
        'secondary-color': '#E2FFDD',
        'yellow': '#FFE70C'
      },
      keyFrames:{
        'fadeIn':{
          '0%':{opacity:'0'},
          '100%':{opacity:'1'}
        }
      },
      animation:{
        'fadeIn':'fadeIn 0.3s ease-in-out'
      }
    },
  },
  plugins: [],
}

