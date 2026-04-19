/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#f0f4ff',
          100: '#e0eaff',
          200: '#c1d5ff',
          300: '#93b4ff',
          400: '#6090ff',
          500: '#3a6bff',
          600: '#1e47f5',
          700: '#1534e0',
          800: '#162ab5',
          900: '#182a8f',
          950: '#111c5c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
