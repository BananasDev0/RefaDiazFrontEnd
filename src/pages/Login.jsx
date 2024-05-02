import { useState } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/Firebase/auth';
import Logo from '../assets/LOGO CON CONTORNO BLANCO RD.png';
import { useMobile } from '../components/MobileProvider';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {

  const responsive = useMobile(); // 'sm' para dispositivos móviles

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: 'error',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Restablecer la alerta
    setAlert({ ...alert, show: false });

    if (!email || !password) {
      setAlert({
        show: true,
        message: 'Favor de introducir los campos requeridos',
        severity: 'error',
      });
      return;
    }

    if (!emailRegex.test(email)) {
      setAlert({
        show: true,
        message: 'Introduce un Email valido',
        severity: 'error',
      });
      setError((prevError) => ({
        ...prevError,
        email: 'Email no válido',
      }));
      return;
    }


    try {
      setIsLoading(true);
      const validate = await signIn(email, password);

      if (validate) {
        navigate('/home');
      } else {
        setAlert({ show: true, message: 'Usuario o Contraseña incorrecta', severity: 'error' });
      }
    } catch (error) {
      console.log(error);
      setAlert({ show: true, message: 'Servicio no disponible', severity: 'error' });
    } finally {
      setIsLoading(false); 
    }


  };

  return (
    <Container
      component='main'
      sx={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <CssBaseline />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <img
          src={Logo}
          alt='Logotipo Refaccionaria Diaz'
          style={{ width: responsive.isMobile || responsive.isLandscape ? 350 : 500, height: 'auto', marginBottom: 20 }}
        />
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error.email}
            helperText={error.email}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error.password}
            helperText={error.password}
          />
          <Button
            color='success'
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          {isLoading && (
            <Box
              sx={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9999,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {alert.show && (
            <Stack sx={{ width: '100%', mb: 2 }}>
              <Alert severity={alert.severity}>{alert.message}</Alert>
            </Stack>
          )}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
