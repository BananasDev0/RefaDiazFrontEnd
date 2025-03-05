import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const ModelsTable = ({ models, onDelete, readOnly = false }) => {
  return (
    <Table size="small" sx={{ mt: 4 }}>
      <TableHead>
        <TableRow>
          <TableCell>Modelo</TableCell>
          <TableCell align="right">Año Inicial</TableCell>
          <TableCell align="right">Año Final</TableCell>
          {!readOnly && <TableCell align="right">Acciones</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {models.map((productCarModel, index) => (
          <TableRow key={productCarModel.id}>
            <TableCell component="th" scope="row">
              {productCarModel.carModel.name}
            </TableCell>
            <TableCell align="right">{productCarModel.initialYear}</TableCell>
            <TableCell align="right">{productCarModel.lastYear}</TableCell>
            {!readOnly && (
              <TableCell align="right">
                <IconButton onClick={() => onDelete(index)} aria-label="delete">
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