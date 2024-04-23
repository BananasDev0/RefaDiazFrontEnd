import { useState } from 'react';
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, IconButton, Typography, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandableCard from '../../../components/ExpandableCard';
import { useProductDialogContext } from './ProductDialogContext';

const PriceManagerDisplay = ({
  associatedPrices,
  handleDeletePrice,
  description,
  setDescription,
  cost,
  setCost,
  handleAddPrice,
  readOnly = false
}) => {
  return (
    <ExpandableCard title="Precios">
      <Typography gutterBottom variant="body2" component="p" sx={{ mb: 2 }}>
        {readOnly ? '' : 'Agrega y gestiona los precios.'}
      </Typography>
      {!readOnly && (
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
      )}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Costo</TableCell>
            {!readOnly && <TableCell align="right">Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {associatedPrices.map((price, index) => (
            <TableRow key={index}>
              <TableCell>{price.description}</TableCell>
              <TableCell align="right">{price.cost}</TableCell>
              {!readOnly && <TableCell align="right">
                <IconButton onClick={() => handleDeletePrice(index)} size="large">
                  <DeleteIcon />
                </IconButton>
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ExpandableCard>
  )
};

const PriceManagerContainer = () => {
  const { associatedPrices, setAssociatedPrices } = useProductDialogContext();
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');

  const handleAddPrice = () => {
    if (!description || !cost) return;
    setAssociatedPrices([...associatedPrices, { description, cost: Number(cost) }]);
    setDescription('');
    setCost('');
  };

  const handleDeletePrice = (index) => {
    const updatedPrices = associatedPrices.filter((_, i) => i !== index);
    setAssociatedPrices(updatedPrices);
  };

  return (
    <PriceManagerDisplay
      associatedPrices={associatedPrices}
      handleDeletePrice={handleDeletePrice}
      description={description}
      setDescription={setDescription}
      cost={cost}
      setCost={setCost}
      handleAddPrice={handleAddPrice}
    />
  );
};

export { PriceManagerContainer as default, PriceManagerDisplay }
