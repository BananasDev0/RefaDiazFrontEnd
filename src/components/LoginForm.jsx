import { useState } from 'react';
import { TextField, Button, Stack, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useAuth from '../hooks/useAuth';

const LoginForm = ({ logoSrc, isMobile }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loading, login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Stack
      spacing={3}
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
      }}
    >
      <img
        src={logoSrc}
        alt="Logotipo Refaccionaria Diaz"
        style={{
          width: isMobile ? 280 : 350,
          height: 'auto',
        }}
      />
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
        variant="outlined"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        color="primary"
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          borderRadius: '8px',
          textTransform: 'none'
        }}
        disabled={loading}
      >
        Sign In
      </Button>
    </Stack>
  );
};

export default LoginForm;