import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  type TextFieldProps,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type PasswordInputProps = Omit<TextFieldProps, 'type' | 'InputProps'> & {
  InputProps?: Omit<TextFieldProps['InputProps'], 'endAdornment'>;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
  InputProps,
  disabled,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      disabled={disabled}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleTogglePasswordVisibility}
              disabled={disabled}
              edge="end"
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}; 