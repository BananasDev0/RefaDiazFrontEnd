import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2A4B8D', // azulAccion
    },
    secondary: {
      main: '#D9232D', // rojoPrincipal
    },
    background: {
      default: '#FFFFFF', // blancoOriginal
      paper: '#F4F6F8', // blancoPuro
    },
    text: {
      primary: '#333333', // grisTextoPrincipal
      secondary: '#666666', // grisTextoSecundario
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});

export default theme; 