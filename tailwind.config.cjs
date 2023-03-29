/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat'],
    },
    extend: {
      colors: {
        gray: '#ABABAB',
        blue: '#2F80ED',
        red: '#EB5757',
      },
    },
  },
  plugins: [],
};
