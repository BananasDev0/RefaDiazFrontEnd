import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const ModelsTable = ({ models, onDelete, readOnly = false, onCopy }) => {
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
            <TableCell component="th" scope="row" key={`model-name-${productCarModel.id}`}>
              {productCarModel.carModel.name}
            </TableCell>
            <TableCell align="right" key={`initial-year-${productCarModel.id}`}>{productCarModel.initialYear}</TableCell>
            <TableCell align="right" key={`last-year-${productCarModel.id}`}>{productCarModel.lastYear}</TableCell>
            {!readOnly && (
              <TableCell align="right" key={`actions-${productCarModel.id}`}>
                <IconButton onClick={() => onDelete(index)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => onCopy(productCarModel)} aria-label="copy">
                  <ContentCopyIcon />
                </IconButton>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}; 