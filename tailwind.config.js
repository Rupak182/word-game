/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow:{
        'sm':'0 4px 0 0 rgb(103, 33, 113)'
      }
    },
  },
  plugins: [],
}