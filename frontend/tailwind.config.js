module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background': 'var(--background)',
        'foreground': 'var(--foreground)',
        'textColor': 'var(--textColor)',
        'secondaryTextColor': 'var(--secondaryTextColor)',
        'darkTextColor': 'rgb(255,255,255)',
        'primaryBtnBg': 'rgb(66, 133, 244)',
        'secondaryBtnBg': 'rgb(44, 62, 80)', // need to fix this
        'secondaryBtnBg': 'rgb(75, 85, 99)', // need to fix this
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(function ({ addBase }) {
      addBase({
        ':root': {
          '--background': 'rgb(255, 255, 255)',
          '--foreground': 'rgb(30, 30, 30)',
          '--textColor': 'rgb(33, 37, 41)',
          '--secondaryTextColor': 'rgb(40, 40, 40)',
        },
        '.dark': {
          '--background': 'rgb(18, 18, 18)',
          '--foreground': 'rgb(255, 255, 255)',
          '--textColor': 'rgb(235, 235, 235)',
          '--secondaryTextColor': 'rgb(220, 220, 220)',
        },
      });
    }),
  ],
  darkMode: ['class'], // Ensures dark mode works with class-based toggle
  important: true
};
