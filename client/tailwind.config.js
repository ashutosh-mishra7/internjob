/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Design token colors via CSS variables
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        // Map standard Tailwind grays to our custom palette shades
        gray: {
          50:  '#F6FAFD',
          100: '#E3EFF8',
          200: '#B3CFE5',
          300: '#8EB7D8',
          400: '#6696BD',
          500: '#4A7FA7',
          600: '#396A8F',
          700: '#255277',
          800: '#1A3D63',
          900: '#102B4B',
          950: '#0A1931',
        },
      },
      borderRadius: {
        'btn': '10px',
        'card': '16px',
        'input': '10px',
        'dialog': '20px',
        'badge': '6px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)',
        'elevated': '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.03)',
        'dialog': '0 25px 50px -12px rgba(0,0,0,0.18)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '250': '250ms',
      },
    },
  },
  plugins: [],
}
