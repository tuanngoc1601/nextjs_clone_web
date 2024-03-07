import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        150: "150px",
        870: "870px",
      },
      height: {
        62: "62px",
        150: "150px",
        280: "280px",
        580: "580px",
      },
      colors: {
        bgInputSearch: "#eeeeee",
        textPrimary: "#767676",
        textSecondary: "#111111",
        borderColor: "#d1d1d1",
        bgHover: "#e7e7e7",
        bgSection: "#f5f5f5",
        iconColor: "#555555",
        bgButtonIcon: "#ffffffe6",
        bgHoverItem: "#e1e1e1",
      },
      fontSize: {
        '15px': "15px",
        '40px': "40px",
      },
      margin: {
        '62px': "62px",
      },
    },
  },
  plugins: [],
}
export default config
