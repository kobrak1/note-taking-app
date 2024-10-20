/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f8fafc',    // slate-50
        secondary: '#cbd5e1',  // slate-300
        tertiary: '#64748b',   // slate-500

        // button colors
        btnPrimary: '#60a5fa',
        btnSecondary: '#3b82f6',
        btnTertiary:'#2563eb',
      },
    },
  },
  plugins: [],
}