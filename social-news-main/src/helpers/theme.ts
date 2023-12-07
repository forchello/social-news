import { createTheme, ThemeOptions } from "@mui/material/styles";

type MyThemeOptions = ThemeOptions & {
    overrides?: {
        MuiButton?: {
            root?: {
                my: number,
                color: string,
                display: string,
                borderRadius: number,
                fontWeight: number
            };
        };
    };
};
export const theme = createTheme({
    overrides: {
        MuiButton: {
            root: {
                my: 2,
                color: 'white',
                display: 'block',
                borderRadius: 2,
                fontWeight: 600
            }
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontSize: 14,
    },
    palette: {
        primary: {
            main: '#703eff',
        },
        secondary: {
            main: '#9370DB',
        },
        error: {
            main: '#f50057',
        },
    }
} as MyThemeOptions);