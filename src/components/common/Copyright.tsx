import React from 'react';
import { Typography, type SxProps, type Theme } from '@mui/material';

interface CopyrightProps {
  sx?: SxProps<Theme>;
}

export const Copyright: React.FC<CopyrightProps> = ({ sx }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={sx}
    >
      Copyright © Radiadores Diaz {currentYear}.
    </Typography>
  );
}; 