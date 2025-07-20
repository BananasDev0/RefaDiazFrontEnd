import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField, Box } from '@mui/material';

const ProductFilterBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        searchParams.set('q', searchTerm);
      } else {
        searchParams.delete('q');
      }
      setSearchParams(searchParams);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, setSearchParams]);

  return (
    <Box sx={{ my: 2 }}>
      <TextField
        fullWidth
        label="Buscar por texto"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Box>
  );
};

export default ProductFilterBar;
