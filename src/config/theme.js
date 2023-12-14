// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        punky: {
            main: '#D37733',
            contrastText: '#FFFFFF'
        },
        kellyGreen: {
            main: '#2ABC7A',
            contrastText: '#FFFFFF'
        },
        purple: {
            main: '#7A3E87',
            contrastText: '#FFFFFF'
        },
        sharpRed: {
            main: '#FF1D25',
            contrastText: '#FFFFFF'
        },
        mustard: {
            main: '#E0B555',
            contrastText: '#FFFFFF'
        },
        ramsBlue: {
            main: '#2B76BA',
            contrastText: '#FFFFFF'
        },
        pitchBlack: {
            main: '#000000',
            contrastText: '#FFFFFF'
        },
        matteBlack: {
            main: '#342F2A',
            contrastText: '#FFFFFF'
        },
        stone: {
            main: '#E6E6E6',
            contrastText: '#FFFFFF'
        },
        white: {
            main: '#FFFFFF',
            contrastText: '#FFFFFF'
        },
    },
    // You can customize other aspects of the theme here
    // For example: typography, spacing, breakpoints, etc.
});
export default theme;