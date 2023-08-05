/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'red': {
          650: '#d60d0d',
        },
        'zinc': {
          350: '#b7b7b7'
        }
      },
      gridTemplateRows: {
        '0': 'repeat(1, minmax(0, 0fr))',
      },
      keyframes: {
        automaticTimer: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        }
      },
      animation: {
        automatic: 'automaticTimer linear 1',
      }
    },
  },
  plugins: [],
}