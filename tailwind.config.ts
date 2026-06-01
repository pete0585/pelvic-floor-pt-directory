import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAFAF7',
          50: '#FDFDFB',
          100: '#FAFAF7',
          200: '#F2F2EB',
          300: '#E8E8DC',
        },
        teal: {
          DEFAULT: '#1A6B6B',
          50: '#EDF5F5',
          100: '#C8E0E0',
          200: '#91C2C2',
          300: '#5AA4A4',
          400: '#258080',
          500: '#1A6B6B',
          600: '#145252',
          700: '#0E3A3A',
        },
        coral: {
          DEFAULT: '#E07B6B',
          50: '#FDF3F1',
          100: '#F9DDD8',
          200: '#F3BAB1',
          300: '#E8968A',
          400: '#E07B6B',
          500: '#D15F4D',
          600: '#B84538',
        },
        sage: {
          DEFAULT: '#7FAF8A',
          50: '#F1F6F2',
          100: '#D5E7D9',
          200: '#AECFB6',
          300: '#7FAF8A',
          400: '#5E9268',
          500: '#437549',
          600: '#305736',
        },
        stone: {
          DEFAULT: '#3D3830',
          50: '#F5F4F2',
          100: '#E0DDD8',
          200: '#B8B3AB',
          300: '#908980',
          400: '#6B6258',
          500: '#4E4640',
          600: '#3D3830',
          700: '#2C2823',
          800: '#1C1915',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-cream': 'linear-gradient(135deg, #FAFAF7 0%, #F2F2EB 100%)',
        'gradient-teal': 'linear-gradient(135deg, #C8E0E0 0%, #1A6B6B 100%)',
        'gradient-hero': 'linear-gradient(160deg, #EDF5F5 0%, #FAFAF7 50%, #F9DDD8 100%)',
      },
      boxShadow: {
        soft: '0 2px 16px rgba(26,107,107,0.06)',
        card: '0 4px 24px rgba(26,107,107,0.08)',
        'card-hover': '0 8px 32px rgba(26,107,107,0.14)',
        teal: '0 4px 14px rgba(26,107,107,0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
