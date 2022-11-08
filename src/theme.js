import { deepPurple } from '@mui/material/colors';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DCD7C9',
    },
    secondary: {
      main: '#e7d111',
    },
  },
  typography: {
    fontFamily: ['Quicksand', 'sans-serif'].join(','),
    second: {
      fontFamily: "Source Sans Pro",
      fontSize: '1.2em'
   } 
  },
});

export default theme;
