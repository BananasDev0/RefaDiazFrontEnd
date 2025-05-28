import React from 'react';
import {
  Container,
  Box,
} from '@mui/material';
import { useMobile } from '../contexts/MobileProvider';
import { LoginForm } from '../components/LoginForm';
import { Copyright } from '../components/common/Copyright';
import Logo from '../assets/Logo_RD.png';

export const Login: React.FC = () => {
  const { isMobile } = useMobile();

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: 400,
            px: isMobile ? 2 : 4,
            py: isMobile ? 3 : 4,
            borderRadius: 2,
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.12)',
            border: '1px solid #E0E0E0',
            backgroundColor: 'background.paper',
          }}
        >
          <LoginForm logoSrc={Logo} isMobile={isMobile} />
        </Box>
        
        <Copyright sx={{ mt: 6, mb: 4 }} />
      </Container>
    </>
  );
}; 