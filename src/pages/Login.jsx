import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useMobile } from '../components/MobileProvider';
import LoginForm from '../components/LoginForm';
import LoadingOverlay from '../components/LoadingOverlay';
import Copyright from '../components/Copyright';
import useAuth from '../hooks/useAuth';
import Logo from '../assets/LOGO CON CONTORNO BLANCO RD.png';

export default function Login() {
  const responsive = useMobile();
  const { loading } = useAuth();

  return (
    <Container
      component="main"
      sx={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <CssBaseline />
      <LoginForm logoSrc={Logo} isMobile={responsive.isMobile || responsive.isLandscape} />
      <LoadingOverlay loading={loading} />
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}