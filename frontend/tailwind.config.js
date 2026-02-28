/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Paleta de cores personalizada para PetCare
                primary: {
                    50: '#fdf4f3',
                    100: '#fce8e6',
                    200: '#f9d5d1',
                    300: '#f4b5ad',
                    400: '#eb897c',
                    500: '#df6251',
                    600: '#cc4534',
                    700: '#ab3728',
                    800: '#8e3125',
                    900: '#772e25',
                    950: '#40140f',
                },
                secondary: {
                    50: '#f0fdf5',
                    100: '#dcfce8',
                    200: '#bbf7d1',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803c',
                    800: '#166533',
                    900: '#14532d',
                    950: '#052e14',
                },
                accent: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    950: '#451a03',
                },
            },
            fontFamily: {
                sans: ['Outfit', 'system-ui', 'sans-serif'],
                display: ['Fraunces', 'serif'],
            },
        },
    },
    plugins: [],
}
