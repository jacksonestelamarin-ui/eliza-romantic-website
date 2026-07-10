/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#f6f3fb',
          100: '#ece6f7',
          200: '#dcd2ee',
          300: '#c4b5e0',
          400: '#a993cf',
          500: '#8f74bf',
        },
        warmgray: {
          50: '#faf8f6',
          100: '#f2efe9',
          200: '#e6e1d8',
          300: '#d4ccc0',
          400: '#b3a89b',
        },
        blush: {
          100: '#fce7ec',
          200: '#f8ccd6',
          300: '#f0a9bb',
          400: '#e5879f',
        },
        sky: {
          100: '#e3eef5',
          200: '#c4dcef',
          300: '#9bc4e4',
          400: '#6fa8d4',
        },
        whale: '#7a93a8',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        kenburns: 'kenburns 40s ease-in-out infinite alternate',
        floatWhale: 'floatWhale 22s ease-in-out infinite',
        floatHeart: 'floatHeart 9s ease-in-out infinite',
        fadeIn: 'fadeIn 1.4s ease forwards',
        fadeInUp: 'fadeInUp 1.1s cubic-bezier(0.22,1,0.36,1) forwards',
        fadeInDown: 'fadeInDown 1.1s cubic-bezier(0.22,1,0.36,1) forwards',
        softPulse: 'softPulse 3.2s ease-in-out infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        spinSlow: 'spin 14s linear infinite',
        breathe: 'breathe 5s ease-in-out infinite',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translate(0%, 0%)' },
          '100%': { transform: 'scale(1.18) translate(-2%, -1.5%)' },
        },
        floatWhale: {
          '0%, 100%': { transform: 'translate(0px, 0px) rotate(-2deg)' },
          '50%': { transform: 'translate(24px, -22px) rotate(2deg)' },
        },
        floatHeart: {
          '0%': { transform: 'translateY(0) translateX(0) scale(0.9)', opacity: '0' },
          '15%': { opacity: '0.7' },
          '85%': { opacity: '0.5' },
          '100%': {
            transform: 'translateY(-170px) translateX(var(--drift,0px)) scale(1.1)',
            opacity: '0',
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        softPulse: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
};
