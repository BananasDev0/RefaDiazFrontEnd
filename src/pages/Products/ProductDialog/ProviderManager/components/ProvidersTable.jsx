import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProvidersTable = ({ providers, onDelete, onProviderClick, editable }) => {
  return (
    <Table size="small" sx={{ mt: 4 }}>
      <TableHead>
        <TableRow>
          <TableCell>Proveedor</TableCell>
          <TableCell align="right">Precio de Compra</TableCell>
          <TableCell align="right">Número de Series</TableCell>
          {editable && <TableCell align="right">Acciones</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {providers?.map((providerProduct, index) => (
          <TableRow 
            key={index} 
            onClick={() => onProviderClick(providerProduct.provider)}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
          >
            <TableCell>{providerProduct.provider.name}</TableCell>
            <TableCell align="right">{providerProduct.price.cost}</TableCell>
            <TableCell align="right">{providerProduct.numSeries}</TableCell>
            {editable && (
              <TableCell align="right">
                <IconButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(index);
                  }} 
                  aria-label="delete"
                >
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