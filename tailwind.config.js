/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'body': ['Poppins', 'sans-serif']
      },
      colors: {
        'red': {
          650: '#d60d0d',
        }
      },
      gridTemplateRows: {
        '0': 'repeat(1, minmax(0, 0fr))',
      },
    },
  },
  plugins: [],
}