import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',       // Add this!
    './components/**/*.{js,ts,jsx,tsx,mdx}' // Add this!
  ],
  // ... rest of your config

  theme: {
    extend: {
      fontFamily: {
        fraunces: ['Fraunces', 'Georgia', 'serif'],
        chivo:    ['Chivo', 'Inter', 'sans-serif'],
      },
      colors: {
        parchment:    '#F4F4F0',
        'parchment-d':'#EEEEE8',
        'parchment-dd':'#E6E6DE',
        ink:          '#1C2B1A',
        'ink-mid':    '#2E3D2C',
        forest:       '#3D6B45',
        'forest-d':   '#2A4D30',
        'forest-l':   '#EBF2EC',
        muted:        '#8A8A7A',
        'muted-l':    '#AEAE9E',
        border:       '#DDDDD5',
        'border-d':   '#C8C8BE',
      },
    },
  },
  plugins: [],
}
export default config
