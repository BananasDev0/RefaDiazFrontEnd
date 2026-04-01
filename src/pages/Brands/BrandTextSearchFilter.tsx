import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField } from '@mui/material';

const BrandTextSearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('name') || '');
  const searchParamsKey = searchParams.toString();

  useEffect(() => {
    setSearchTerm(searchParams.get('name') || '');
  }, [searchParams, searchParamsKey]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParamsKey);

      if (searchTerm) {
        params.set('name', searchTerm);
      } else {
        params.delete('name');
      }

      setSearchParams(params);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, searchParamsKey, setSearchParams]);

  return (
    <TextField
      fullWidth
      label="Buscar por nombre"
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  );
};

export default BrandTextSearchFilter;
