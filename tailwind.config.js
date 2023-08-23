/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
        '#809BBF': '#809BBF',  // navy blue
        '#F7F2ED': '#F7F2ED',  // background color
        '#E6EAEF': '#E6EAEF',  // light blue
        '#BFC3C8': '#BFC3C8',  // gray

      }
    },
  },
  plugins: [],
}
