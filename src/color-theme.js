import { createTheme } from '@mui/material/styles';

export const color_theme = createTheme({
    htmlFontSize: 10,
    palette: {
        primary: {
            light: '#fefaf9',
            main: '#fbdcbc',
            dark: '#252122',
            contrastText: '#fff',
        },
        secondary: {
            light: '#e5ffff',
            main: '#b2ebf2',
            dark: '#81b9bf',
            contrastText: '#000',
        },
    },
});