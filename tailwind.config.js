/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        'body-light': 'var(--mantine-color-body)',
        'body-dark': 'var(--mantine-color-dark-6)',
        'gray-200': 'var(--mantine-color-gray-3)',
        'gray-700': 'var(--mantine-color-dark-4)',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      spacing: {
        xs: 'var(--mantine-spacing-xs)',
        md: 'var(--mantine-spacing-md)',
        xl: 'var(--mantine-spacing-xl)',
      },
      borderRadius: {
        sm: 'var(--mantine-radius-sm)',
      },
      fontSize: {
        sm: 'var(--mantine-font-size-sm)',
      },
    },
  },
  plugins: [],
}
