import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'on-open-chat': {
          from: { width: '0px' },
          to: { width: '100vw' }
        },
        'on-close-chat': {
          from: { width: '100vw' },
          to: { width: '0px' }
        }
      },
      animation: {
        'on-open-chat': 'on-open-chat 0.5s ease-in-out forwards',
        'on-close-chat': 'on-close-chat 0.5s ease-in-out forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
