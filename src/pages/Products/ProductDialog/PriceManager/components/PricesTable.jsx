import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const PricesTable = ({ prices, onDelete, readOnly = false }) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Descripción</TableCell>
          <TableCell align="right">Costo</TableCell>
          {!readOnly && <TableCell align="right">Acciones</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {prices.map((productPrice, index) => (
          <TableRow key={index}>
            <TableCell>{productPrice.price.description}</TableCell>
            <TableCell align="right">{productPrice.price.cost}</TableCell>
            {!readOnly && (
              <TableCell align="right">
                <IconButton onClick={() => onDelete(index)} size="large">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}; 