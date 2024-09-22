/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        fon: ['QiaDisplay-Black'],
        shadd:['ShadowHand'],
        trah:['Trajan Pro'],
        chunky : ['MBJ Chunky']
      }
    },
  },
  plugins: [],
}