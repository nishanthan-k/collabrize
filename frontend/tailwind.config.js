/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Common colors
        white: '#FFFFFF',
        lightBlue: '#99CCFF',
        mediumBlue: '#6699CC',
        darkBlue: '#336699',
        deepDarkBlue: '#204C6E',
        softAqua: '#C0D9D9',
        hoverBlue: '#5C87B2',
        offWhite: '#D7E0F9',

        // Light mode colors
        light: {
          navbar: '#99CCFF',
          sidebar: '#C0D9D9',
          textPrimary: '#336699',
          textSecondary: '#6699CC',
          buttonPrimaryBg: '#6699CC',
          buttonPrimaryText: '#FFFFFF',
          buttonPrimaryHoverBg: '#336699',
          buttonSecondaryBg: '#99CCFF',
          buttonSecondaryText: '#336699',
          buttonSecondaryHoverBg: '#C0D9D9',
        },

        // Dark mode colors
        dark: {
          navbar: '#204C6E',
          sidebar: '#336699',
          textPrimary: '#FFFFFF',
          textSecondary: '#D7E0F9',
          buttonPrimaryBg: '#4586B3',
          buttonPrimaryText: '#FFFFFF',
          buttonPrimaryHoverBg: '#76C0F6',
          buttonSecondaryBg: '#76C0F6',
          buttonSecondaryText: '#204C6E',
          buttonSecondaryHoverBg: '#99CCFF',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
