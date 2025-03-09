import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import useAuth from '../hooks/useAuth';

const LoginForm = ({ logoSrc, isMobile }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <img
        src={logoSrc}
        alt="Logotipo Refaccionaria Diaz"
        style={{
          width: isMobile ? 350 : 500,
          height: 'auto',
          marginBottom: 20,
        }}
      />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color="success" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;