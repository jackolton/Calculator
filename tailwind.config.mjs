/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        google: {
          blue:        '#1a73e8',
          'blue-dk':   '#1557b0',
          'blue-lt':   '#e8f0fe',
          'blue-bd':   '#c5d8f7',
          text:        '#202124',
          muted:       '#5f6368',
          hint:        '#80868b',
          bg:          '#f8f9fa',
          border:      '#dadce0',
          divider:     '#e8eaed',
          hover:       '#f1f3f4',
          green:       '#34a853',
          yellow:      '#fbbc04',
          red:         '#ea4335',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
        lift: '0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)',
      },
    },
  },
  plugins: [],
};
