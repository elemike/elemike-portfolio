import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'],
      },
      colors: {
        palette: {
          bg: '#FFF8EB',
          dark: '#0A1128',
          navy: '#001F54',
          blue: '#034078',
          accent: '#81A4CD',
        },
      },
    },
  },
  plugins: [],
};

export default config;