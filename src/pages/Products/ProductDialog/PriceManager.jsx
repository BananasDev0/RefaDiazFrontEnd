import { useState } from 'react';
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, IconButton, Typography, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandableCard from '../../../components/ExpandableCard';
import { useProductDialogContext } from './ProductDialogContext';
import Price from '../../../models/Price';
import ProductPrice from '../../../models/ProductPrice';

const PriceManagerDisplay = ({
  product,
  price,
  setPrice,
  handleDeletePrice,
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
            value={price.description ?? ''}
            onChange={(e) => {
              let newDescription = e.target.value;
              setPrice(new Price({ ...price, description: newDescription }));
            }}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Costo"
            type="number"
            variant="outlined"
            value={price.cost ?? ''}
            onChange={(e) => {
              let newCost = e.target.value;
              setPrice(new Price({ ...price, cost: newCost }));
            }}
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
          {product.prices.map((productPrice, index) => (
            <TableRow key={index}>
              <TableCell>{productPrice.price.description}</TableCell>
              <TableCell align="right">{productPrice.price.cost}</TableCell>
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
  const { product, handleSetProduct } = useProductDialogContext();
  const [price, setPrice] = useState(new Price({}));

  const handleAddPrice = () => {
    const updatedPrices = [...product.prices, new ProductPrice({price})];
    console.log(updatedPrices)
    handleSetProduct({ ...product, prices: updatedPrices });
    setPrice(new Price({}));
  };

  const handleDeletePrice = (index) => {
    const updatedPrices = product.prices.filter((price, i) => i !== index);
    handleSetProduct({ ...product, prices: updatedPrices });
  };

  return (
    <PriceManagerDisplay
      product={product}
      price={price}
      setPrice={setPrice}
      handleDeletePrice={handleDeletePrice}
      handleAddPrice={handleAddPrice}
    />
  );
};

export { PriceManagerContainer as default, PriceManagerDisplay }
