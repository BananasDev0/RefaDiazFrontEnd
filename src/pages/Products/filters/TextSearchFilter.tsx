import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField } from '@mui/material';

const TextSearchFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const searchParamsKey = searchParams.toString();

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParamsKey);
      if (searchTerm) {
        params.set('q', searchTerm);
      } else {
        params.delete('q');
      }
      setSearchParams(params);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, searchParamsKey, setSearchParams]);

  return (
    <TextField
      fullWidth
      label="Buscar por texto"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default TextSearchFilter;
