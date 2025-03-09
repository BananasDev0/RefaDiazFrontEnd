import { Box, TextField } from '@mui/material';

export const PriceForm = ({
  price,
  onPriceChange
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Descripción"
        variant="outlined"
        value={price.description ?? ''}
        onChange={(e) => onPriceChange('description', e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Costo"
        type="number"
        variant="outlined"
        value={price.cost ?? ''}
        onChange={(e) => onPriceChange('cost', e.target.value)}
        fullWidth
      />
    </Box>
  );
}; 