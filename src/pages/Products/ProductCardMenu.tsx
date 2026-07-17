import type { MouseEvent } from 'react';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface ProductCardMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  onEdit: (event: MouseEvent<HTMLElement>) => void;
  onDelete: (event: MouseEvent<HTMLElement>) => void;
}

/**
 * Menú contextual Editar/Eliminar compartido por las cards de producto.
 */
const ProductCardMenu = ({ anchorEl, open, onClose, onClick, onEdit, onDelete }: ProductCardMenuProps) => (
  <Menu anchorEl={anchorEl} open={open} onClose={onClose} onClick={onClick}>
    <MenuItem onClick={onEdit}>
      <ListItemIcon>
        <EditIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Editar</ListItemText>
    </MenuItem>
    <MenuItem onClick={onDelete}>
      <ListItemIcon>
        <DeleteIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Eliminar</ListItemText>
    </MenuItem>
  </Menu>
);

export default ProductCardMenu;
