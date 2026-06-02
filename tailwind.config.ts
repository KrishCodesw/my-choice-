import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        playfair:  ['"Playfair Display"', 'Georgia', 'serif'],
        outfit:    ['Outfit', 'Inter', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'Garamond', 'serif'],
      },
      colors: {
        navy:           '#0f1923',
        'navy-mid':     '#162030',
        'navy-light':   '#1e2d40',
        cream:          '#f7f3ec',
        'cream-dark':   '#ede7db',
        copper:         '#b87333',
        'copper-light': '#d4956a',
        'copper-dim':   '#7a4d22',
        ink:            '#1a1a2e',
        'muted-dark':   '#8899aa',
        'muted-light':  '#8a7d6e',
        green:          '#2d6a4f',
        'green-light':  '#52b788',
      },
      transitionDuration: { '400': '400ms' },
    },
  },
  plugins: [],
}

export default config
