import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

const BrandTextSearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('name') || '');
  const debouncedSearchTerm = useDebouncedValue(searchTerm);
  const searchParamsKey = searchParams.toString();

  useEffect(() => {
    setSearchTerm(searchParams.get('name') || '');
  }, [searchParams, searchParamsKey]);

  useEffect(() => {
    const params = new URLSearchParams(searchParamsKey);

    if (debouncedSearchTerm) {
      params.set('name', debouncedSearchTerm);
    } else {
      params.delete('name');
    }

    setSearchParams(params);
  }, [debouncedSearchTerm, searchParamsKey, setSearchParams]);

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
