/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        'minH': '6rem'
      },
      maxWidth: {
        'maxW': '40rem'
      },
      width: {
        'noteItemWidth': '40rem'
      },
    },
  },
  plugins: [],
}