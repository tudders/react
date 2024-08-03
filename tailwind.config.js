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
      },
    },
  },

  // add plugins to your Tailwind CSS project
  plugins: [require('@tailwindcss/forms'), require('preline/plugin')],
};
