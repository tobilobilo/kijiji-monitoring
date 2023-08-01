/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        
      },
      colors: {
        'red': {
          650: '#d60d0d',
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