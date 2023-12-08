/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'catalina-blue': '#2a3f54',
        'gray': '#293341',
        'red-custom': '#a8020a',
        'gray-custom': '#333',
        'blue-custom': '#1e97f3',
        'white-rgba': 'rgba(255,255,255,0.95)',
        'gray98': '#fafafa',
        'eclipse': '#3a3a3a',
        'grey': '#7e7e7e',
        'honeydew': '#f3f6f3',
        'light-gray': '#dddddd',
        'gray15': '#262626',
        'blue': '#83e1e5',
        'alice-blue': '#1f1f1f'
      }
    },
  },
  plugins: [],
}

