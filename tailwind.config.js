/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // ✅ Important for Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
  require('@tailwindcss/line-clamp'),
  require('@tailwindcss/typography'),
 
  require('flowbite/plugin'),

],
}