import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        mono:  ['"Space Mono"', 'monospace'],
        sans:  ['Geist', 'Inter', 'sans-serif'],
      },
      colors: {
        black:   '#0D0D0D',
        white:   '#F0EDE6',
        amber:   '#E8892A',
        'amber-d': '#B86A10',
        grey:    '#1A1A1A',
        'grey-2': '#2A2A2A',
        'grey-3': '#3A3A3A',
        muted:   '#7A7A7A',
        border:  '#232323',
      },
    },
  },
  plugins: [],
}
export default config
