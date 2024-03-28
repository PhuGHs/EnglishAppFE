/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/screens/**/*.{js,jsx,ts,tsx}', './src/navigation/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'nunitoRegular': ['Nunito_400Regular'],
        'nunitoMedium': ['Nunito_500Medium'],
        'nunitoSemi': ['Nunito_600SemiBold'],
        'nunitoBold': ['Nunito_700Bold'],
        'nunitoXBold': ['Nunito_800ExtraBold']
      },
    },
  },
  plugins: [],
};

