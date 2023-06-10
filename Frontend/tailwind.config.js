/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-primary': '#39289F',
        'yellow-primary': '#FA9021',
        'black-new' : '#1C140F',
        'purple-new' : '#1D1D41',
        
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'rubik': ['Rubik', 'sans-serif'],
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
}