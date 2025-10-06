/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow:{
        'custom': '-1px 2px 10.1px rgba(0, 0, 0, 0.4)',
        'card': '0px 2px 4.7px rgba(0, 0, 0, 0.4)',
        'dashboardCard': '0px 1px 5.2px rgba(0, 0, 0, 0.4)',
        'chatbot': '0px 1px 4px #ACACAC',
        'notification': '0px 2px 4px #00000060',
        'manual': '0px 5px 2px #00000050',
        'uploadImage': '6px 6px 4px rgba(0, 0, 0, 0.25)'

      },
      backgroundImage: {
        'tasa': "url('/src/assets/images/background/bg-login.svg')",
      },
      colors: {
        green: {
          DEFAULT: '#86C246',
        },
        blue: {
          DEFAULT: '#007696',
          btn: '#007696',
          pdf: '#184A7D80',
        },
        'side-bar': {
          DEFAULT: '#184A7D',
        },
        'blue-dark': {
          DEFAULT: '#111928',
        },
        'blue-light': {
          DEFAULT: '#5CBDEB',
        },
        red: {
          DEFAULT: '#EB5757',
        },
        'red-dark': {
          DEFAULT: '#CA2D00',
        },
        yellow: {
          DEFAULT: '#FFC700',
        },
        gray: {
          DEFAULT: '#808080',
        },
      },
      fontFamily: {
        rubikregular: ['Rubik-regular', 'sans-serif'],
        rubikmedium: ['Rubik-medium', 'sans-serif'],
        rubiklight: ['Rubik-light', 'sans-serif'],
        itcdemi: ['ITC-demi', 'sans-serif'],
        itcbold: ['ITC-bold', 'sans-serif'],
        itcbook: ['ITC-book', 'sans-serif'],
        itcmedium: ['ITC-medium', 'sans-serif'],
        robotoregular: ['Roboto-regular', 'sans-serif'],
        anekmedium: ['Anek-medium', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

