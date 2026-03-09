/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -4px rgba(15, 23, 42, 0.08), 0 2px 8px -2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 24px 48px -12px rgba(15, 23, 42, 0.18), 0 8px 24px -8px rgba(15, 23, 42, 0.1)',
        glow: '0 0 24px -4px rgba(59, 130, 246, 0.35)',
      },
    },
  },
  plugins: [],
};
