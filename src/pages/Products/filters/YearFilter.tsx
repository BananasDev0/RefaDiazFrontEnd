import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField } from '@mui/material';

const YearFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [year, setYear] = useState(searchParams.get('year') || '');
  const searchParamsKey = searchParams.toString();

  useEffect(() => {
    setYear(searchParams.get('year') || '');
  }, [searchParamsKey, searchParams]);

  const handleChange = (value: string) => {
    setYear(value);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('year', value);
    } else {
      params.delete('year');
    }

    setSearchParams(params);
  };

  return (
    <TextField
      fullWidth
      label="Año"
      type="number"
      value={year}
      onChange={(event) => handleChange(event.target.value)}
    />
  );
};

export default YearFilter;
