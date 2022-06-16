/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "fa-blue": "#234E70",
        "fa-secondary-blue": "#008EFF",
        "fa-light-blue": "#EBF6FF"
      }
    },
  },
  plugins: [],
}
