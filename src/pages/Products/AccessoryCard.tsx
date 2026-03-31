import { useState, type MouseEvent } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CategoryIcon from '@mui/icons-material/Category';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { useProductMutations } from '../../hooks/useProductMutations';
import type { Product } from '../../types/product.types';

interface AccessoryCardProps {
  product: Product;
}

const AccessoryCard = ({ product }: AccessoryCardProps) => {
  const navigate = useNavigate();
  const { deleteProduct, isDeleting } = useProductMutations();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const menuOpen = Boolean(anchorEl);
  const accessoryModels = product.productCarModels ?? [];

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuCloseFromMouse = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleMenuClose();
  };

  const handleEdit = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (product.id) {
      navigate(`/products/accesorios/edit/${product.id}`);
    }

    handleMenuClose();
  };

  const handleDeleteClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    if (!product.id) {
      return;
    }

    deleteProduct(product.id, {
      onSuccess: () => {
        setDialogOpen(false);
      },
    });
  };

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: 6,
            transform: 'translateY(-4px)',
          },
          transition: 'box-shadow 0.3s, transform 0.3s',
        }}
        onClick={() => product.id && navigate(`/products/accesorios/edit/${product.id}`)}
      >
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                icon={<CategoryIcon />}
                label={product.productCategory?.name || 'Sin categoría'}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>
          }
          action={
            <IconButton aria-label="acciones del accesorio" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          }
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 1,
            minHeight: 156,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              minHeight: 56,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              wordBreak: 'break-word',
            }}
          >
            {product.name}
          </Typography>
          {accessoryModels.length > 0 && (
            <Box sx={{ mt: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.5,
                  mb: 0.5,
                }}
              >
                <DirectionsCarIcon sx={{ fontSize: '1rem' }} />
                {`${accessoryModels[0].carModel?.brand?.name || ''} ${accessoryModels[0].carModel?.name || ''}`.trim()}
              </Typography>
              {accessoryModels.length > 1 && (
                <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                  y {accessoryModels.length - 1} más...
                </Typography>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        onClick={handleMenuCloseFromMouse}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>
      <ConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        description={`¿Estás seguro de que quieres eliminar el accesorio "${product.name}"? Esta acción no se puede deshacer.`}
        isSubmitting={isDeleting}
      />
    </>
  );
};

export default AccessoryCard;
