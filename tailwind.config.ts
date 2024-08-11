import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
const config = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    prefix: 'tw-',
    theme: {
        extend: {
            colors: {
                sidebar: '#25292E',
                secondary: '#0d1b2a'
            }
        }
    },
    plugins: []
} satisfies Config

export default config
