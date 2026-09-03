import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2f5d8a',
    },
    secondary: {
      main: '#d97b3f',
    },
    background: {
      default: '#f4f6f8',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: ['"Inter"', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'].join(','),
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
});
