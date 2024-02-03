/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins_300Light: ['Poppins_300Light'],
        Poppins_400Regular: ['Poppins_400Regular'],
        Poppins_500Medium: ['Poppins_500Medium'],
        Poppins_600SemiBold: ['Poppins_600SemiBold'],
        Poppins_700Bold: ['Poppins_700Bold'],
        Poppins_800ExtraBold: ['Poppins_800ExtraBold'],
      },
    },
    plugins: [],
  },
};
