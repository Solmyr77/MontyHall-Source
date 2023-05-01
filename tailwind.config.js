/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          'bg-dark': 'rgb(32, 26, 23)',
          'elevation-1': 'rgba(255, 255, 255, 0.08)',
          'elevation-2': 'rgba(255, 255, 255, 0.12)',
          'elevation-3': 'rgba(255, 255, 255, 0.16)',
          'elevation-4': 'rgba(255, 255, 255, 0.24)',
          'elevation-5': 'rgba(255, 255, 255, 0.32)',
          'elevation-6': 'rgba(255, 255, 255, 0.4)',
          'elevation-7': 'rgba(255, 255, 255, 0.48)',
          'elevation-8': 'rgba(255, 255, 255, 0.56)',
          'elevation-9': 'rgba(255, 255, 255, 0.64)',
          'elevation-10': 'rgba(255, 255, 255, 0.72)',
          'elevation-11': 'rgba(255, 255, 255, 0.8)',
          'elevation-12': 'rgba(255, 255, 255, 0.88)',
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-elevation')({
      customClasses: {
        'elevation-custom': 'box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.20), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);',
      },
    }),
  ], 
}