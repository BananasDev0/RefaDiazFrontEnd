import React from 'react';
import {
  Stack,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../hooks/useAuth';
import { PasswordInput } from './common/PasswordInput';
import { loginSchema } from '../pages/Login/loginSchema';
import type { LoginFormInputs } from '../types/user.types';

interface LoginFormProps {
  logoSrc: string;
  isMobile: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ logoSrc, isMobile }) => {
  const { loading, login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormInputs): Promise<void> => {
    await login(data);
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
      sx={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={logoSrc}
        alt="Logo Radiadores Diaz"
        sx={{
          width: isMobile ? 120 : 150,
          height: 'auto',
          mb: 2,
        }}
      />

      {/* Título */}
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: 'primary.main',
          textAlign: 'center',
        }}
      >
        Iniciar Sesión
      </Typography>

      {/* Campo de Email */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Correo Electrónico"
            required
            fullWidth
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={loading || isSubmitting}
            variant="outlined"
          />
        )}
      />

      {/* Campo de Contraseña */}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordInput
            {...field}
            label="Contraseña"
            required
            fullWidth
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={loading || isSubmitting}
            variant="outlined"
          />
        )}
      />

      {/* Botón de Envío */}
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        loading={loading || isSubmitting}
        sx={{
          mt: 2,
          py: 1.5,
          borderRadius: '8px',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
        }}
      >
        Iniciar Sesión
      </LoadingButton>
    </Stack>
  );
}; 