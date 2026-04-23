import React, { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface ProvidersToolbarProps {
  onSearchChange: (searchTerm: string) => void;
}

export const ProvidersToolbar: React.FC<ProvidersToolbarProps> = ({ onSearchChange }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  // Efecto "debounce" para la búsqueda
  useEffect(() => {
    // Establece un temporizador. Si el usuario sigue escribiendo, se reinicia.
    const timerId = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 500); // Espera 500ms después de la última pulsación

    // Limpia el temporizador si el componente se desmonta o si el término de búsqueda cambia.
    return () => {
      clearTimeout(timerId);
    };
  }, [localSearchTerm, onSearchChange]);

  return (
    <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar proveedor por nombre, teléfono o dirección..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
