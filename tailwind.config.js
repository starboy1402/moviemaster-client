/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                netflixDark: {
                    "primary": "#E50914",
                    "secondary": "#831010",
                    "accent": "#F5C518",
                    "neutral": "#0F0F0F",
                    "base-100": "#141414",
                    "base-200": "#1F1F1F",
                    "base-300": "#2A2A2A",
                    "base-content": "#E5E5E5",
                    "info": "#3ABFF8",
                    "success": "#36D399",
                    "warning": "#FBBD23",
                    "error": "#F87272",
                },
            },
        ],
    },
}
