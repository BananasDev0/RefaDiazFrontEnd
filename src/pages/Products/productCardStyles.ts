import type { SxProps, Theme } from '@mui/material';

/**
 * Estilo base del Card de producto en el catálogo. El hover se limita a
 * dispositivos con puntero para evitar que quede "pegado" en pantallas táctiles.
 */
export const productCardSx: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  '@media (hover: hover)': {
    '&:hover': {
      boxShadow: 6,
      transform: 'translateY(-4px)',
    },
  },
  transition: 'box-shadow 0.3s, transform 0.3s',
};
