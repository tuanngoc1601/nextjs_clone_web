import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'sm': '320px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        150: "150px",
        870: "870px",
        "70%": "70%",
        "30%": "30%",
        "90%": "90%",
      },
      height: {
        62: "62px",
        150: "150px",
        168: "168px",
        280: "280px",
        580: "580px",
        "90%": "90%",
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
      padding: {
        '17.5': "70px",
      },
      aspectRatio: {
        '10/7': '10 / 7',
      },
    },
  },
  plugins: [],
}
export default config
