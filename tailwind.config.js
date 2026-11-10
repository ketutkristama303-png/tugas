/** @type {import('tailwindcss').Config} */
const easeOut = 'cubic-bezier(0.16, 1, 0.3, 1)';
const easeDrawer = 'cubic-bezier(0.32, 0.72, 0, 1)';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f4f8f9',
          100: '#e7eef0',
          200: '#cfdde1',
          300: '#aec4ca',
          400: '#85a4ac',
          500: '#4d7581',
          600: '#3b6370',
          700: '#2b4c58',
          800: '#1e3a44',
          900: '#132a32',
          950: '#0d1b21',
        },
        brand: {
          50: '#eefbfc',
          100: '#d5f4f7',
          200: '#afe9ef',
          300: '#7dd7e0',
          400: '#44b9c8',
          500: '#1d99ab',
          600: '#027c93',
          700: '#006b82',
          800: '#0a5768',
          900: '#0e4552',
          950: '#072b36',
        },
        coral: {
          50: '#fff9ed',
          100: '#fff0d4',
          200: '#ffdda6',
          300: '#fdc56d',
          400: '#fbaa38',
          500: '#f8951e',
          600: '#df750f',
          700: '#a84a0c',
          800: '#8a3c0b',
          900: '#72320c',
        },
        danger: {
          50: '#fff1f0',
          100: '#ffe0dd',
          200: '#ffc6c1',
          300: '#ff9f97',
          400: '#ff6b60',
          500: '#ef3b2d',
          600: '#cf291d',
          700: '#b42318',
          800: '#8f1d16',
          900: '#771c17',
        },
        mint: {
          50: '#ecfdf6',
          100: '#d2f9e9',
          200: '#a8f1d6',
          300: '#6fe3bc',
          400: '#36cf9e',
          500: '#14b787',
          600: '#08946f',
          700: '#08775c',
          800: '#095e4a',
          900: '#094e3f',
        },
        canvas: '#f5f7f8',
        paper: '#ffffff',
        line: '#e4e9ec',
        muted: '#64717a',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Manrope Variable"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-strong': easeOut,
        drawer: easeDrawer,
      },
      boxShadow: {
        soft: '0 1px 2px rgba(9, 30, 35, 0.04), 0 14px 34px -22px rgba(9, 30, 35, 0.26)',
        card: '0 1px 2px rgba(9, 30, 35, 0.03), 0 24px 60px -32px rgba(9, 30, 35, 0.32)',
        lift: '0 24px 50px -18px rgba(9, 30, 35, 0.22)',
        modal: '0 40px 120px -30px rgba(8, 25, 30, 0.45)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-out': {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-4px) scale(0.97)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
      },
      animation: {
        'fade-up': `fade-up 240ms ${easeOut} both`,
        'fade-in': `fade-in 160ms ${easeOut} both`,
        'slide-in': `slide-in 240ms ${easeOut} both`,
        'scale-in': `scale-in 220ms ${easeOut} both`,
        'scale-out': `scale-out 150ms ${easeOut} both`,
        shimmer: 'shimmer 1.6s linear infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
