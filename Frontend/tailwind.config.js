/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-primary': '#403B70',
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
}