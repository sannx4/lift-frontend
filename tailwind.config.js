/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.3' }, // subtle visibility for the emoji
          fadeOut: { '0%': { opacity: '0.5' }, '100%': { opacity: '0' } },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
    fadeOut: 'fadeOut 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
