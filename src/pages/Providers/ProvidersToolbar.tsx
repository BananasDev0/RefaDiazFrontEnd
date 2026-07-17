import React, { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

interface ProvidersToolbarProps {
  onSearchChange: (searchTerm: string) => void;
}

export const ProvidersToolbar: React.FC<ProvidersToolbarProps> = ({ onSearchChange }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const debouncedSearchTerm = useDebouncedValue(localSearchTerm);

  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

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
