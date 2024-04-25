/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.pug"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
