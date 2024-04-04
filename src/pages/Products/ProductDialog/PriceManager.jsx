import { useState } from 'react';
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, IconButton, Typography, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandableCard from '../../../components/ExpandableCard';
import ProviderManager from './ProviderManager';

const PriceManager = () => {
  const [prices, setPrices] = useState([]);
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');

  const handleAddPrice = () => {
    if (!description || !cost) return;
    setPrices([...prices, { description, cost: Number(cost) }]);
    setDescription('');
    setCost('');
  };

  const handleDeletePrice = (index) => {
    const updatedPrices = prices.filter((_, i) => i !== index);
    setPrices(updatedPrices);
  };

  return (
    <>
      <ExpandableCard title="Precios del Producto">
        <Typography gutterBottom variant="body2" component="p" sx={{ mb: 2 }}>
          Agrega y gestiona los precios.
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Descripción"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Costo"
            type="number"
            variant="outlined"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            fullWidth
          />
          <Button onClick={handleAddPrice} variant="contained" sx={{ mt: 2 }}>
            Agregar Precio
          </Button>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">Costo</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prices.map((price, index) => (
              <TableRow key={index}>
                <TableCell>{price.description}</TableCell>
                <TableCell align="right">{price.cost}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDeletePrice(index)} size="large">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ExpandableCard>
      <ProviderManager />
    </>
  );
};

export default PriceManager;
