/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        koyumavis: '#172026',
        acikmavis: '#5fcdd9',
        mavi: '#04bfad',
        yesil: '#04bf9d',
        koyuyesil: '#027373',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(koyumavis|acikmavis|koyuyesil|mavi|yesil)/,
    },
  ],
}

