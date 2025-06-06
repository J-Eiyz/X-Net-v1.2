/**  @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        xblue: {
          500: '#38bdf8',
          600: '#0284c7',
          700: '#0369a1'
        },
        xdark: {
          800: '#1a1a1a',
          900: '#121212'
        }
      }
    },
  },
  plugins: [],
};
 