/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#f4f4f7',
          100: '#e5e6ec',
          200: '#c1c2d0',
          400: '#5b5d7a',
          600: '#2d2e4a',
          700: '#222338',
          800: '#1a1a2e',
          900: '#0f0f1c',
        },
        accent: {
          50: '#fdecef',
          100: '#fbd5dc',
          400: '#ef5a73',
          500: '#e94560',
          600: '#d12d49',
          700: '#a8233a',
        },
      },
      boxShadow: {
        card: '0 4px 20px rgba(26, 26, 46, 0.08)',
      },
    },
  },
  plugins: [],
};
