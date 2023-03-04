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
      },
      animation: {
        fadeIn: 'fadeIn .5s ease-in',
        fadeInQuick: 'fadeIn .5s ease',
        fadeInOut: 'fadeInOut 1.5s ease',
        slideLeft: 'slideLeft 1s ease-in-out',
        slideRight: 'slideRight 1s ease-in-out',
        growDown: 'growDown .2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 }
        },
        fadeInOut: {
            '0%, 100%': { opacity: 0 },
            '25%, 75%': { opacity: 1 }
        },
        slideLeft: {
          '0%, 50%': {
              opacity: 0,
              transform: 'translateX(20%)'
          },
          '100%': {
              opacity: 1
          }
        },
        slideRight: {
          '0%, 50%': {
              opacity: 0,
              transform: 'translateX(-20%)'
          },
          '100%': {
              opacity: 1
          }
        },
        growDown: {
          '0%': {
              transform: 'scaleY(0)'
          },
          '80%': {
              transform: 'scaleY(1.1)'
          },
          '100%': {
              transform: 'scaleY(1)'
          }
        }
      },
    },
  },
  plugins: [],
}
