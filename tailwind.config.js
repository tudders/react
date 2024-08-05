/** @type {import('tailwindcss').Config} */

module.exports = {
  // configure the paths to all of your source files
  content: ['node_modules/preline/dist/*.js', './src/**/*.{html,js,tsx,ts}'],

  // enable dark mode via class strategy
  darkMode: 'class',

  theme: {
    extend: {
      animation: {
        // Bounces 5 times 1s equals 5 seconds
        'bounce-short': 'bounce 1s ease-in-out 5',
        text: 'text 5s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },

  // add plugins to your Tailwind CSS project
  plugins: [require('@tailwindcss/forms'), require('preline/plugin')],
};
