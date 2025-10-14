/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                darkBackground: '#052759',
                brightColor: '#FCAD0B',
                base: '#EFEFEF',
            },
            fontFamily: {
                baloo: ['Baloo 2', 'cursive'],
            },
        },
    },
    plugins: [],
}