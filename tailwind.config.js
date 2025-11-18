// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".screen-test": {
          "@apply bg-blue-100": "",
        },
      });
    },
  ],
};
