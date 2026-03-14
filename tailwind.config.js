import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                body: ['Jost', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                gold: {
                    300: '#f2d882',
                    400: '#ecc75e',
                    500: '#d4971a',
                    600: '#b97812',
                    900: '#4b3b08',
                },
                obsidian: '#0a0a0f',
                ivory: '#faf8f4',
            },
        },
    },

    plugins: [forms],
};
