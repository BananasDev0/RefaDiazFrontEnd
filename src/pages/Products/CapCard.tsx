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
import SellIcon from '@mui/icons-material/Sell';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { useProductMutations } from '../../hooks/useProductMutations';
import type { Product, ProductCarModel } from '../../types/product.types';

interface CapCardProps {
  product: Product;
}

const getCompatibleCarModels = (product: Product) => {
  const combinedModels = [...(product.productCarModels || []), ...(product.transitiveProductCarModels || [])];
  const seen = new Set<string>();

  return combinedModels.filter((carModel) => {
    const key = `${carModel.carModelId}-${carModel.initialYear ?? ''}-${carModel.lastYear ?? ''}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

const getCarModelLabel = (carModel: ProductCarModel) => {
  const brandName = carModel.carModel.brand?.name || '';
  const modelName = carModel.carModel.name || '';
  const initialYear = carModel.initialYear;
  const lastYear = carModel.lastYear;

  if (initialYear && lastYear) {
    return `${brandName} ${modelName} (${initialYear}-${lastYear})`.trim();
  }

  return `${brandName} ${modelName}`.trim();
};

const CapCard = ({ product }: CapCardProps) => {
  const navigate = useNavigate();
  const { deleteProduct, isDeleting } = useProductMutations();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const compatibleCarModels = getCompatibleCarModels(product);

  const menuOpen = Boolean(anchorEl);

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
      navigate(`/products/tapas/edit/${product.id}`);
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
        onClick={() => product.id && navigate(`/products/tapas/edit/${product.id}`)}
      >
        <CardHeader
          title={(
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                icon={<SellIcon />}
                label={`Clave: ${product.dpi || 'N/D'}`}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>
          )}
          action={(
            <IconButton aria-label="acciones de la tapa" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          )}
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: 1,
            minHeight: 156,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              minHeight: 40,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              wordBreak: 'break-word',
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5, fontWeight: 'medium' }}
          >
            <DirectionsCarIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
            Modelos relacionados:
          </Typography>
          <Box>
            {compatibleCarModels.length > 0 ? (
              compatibleCarModels.slice(0, 3).map((carModel) => (
                <Typography
                  key={`${carModel.carModelId}-${carModel.initialYear}-${carModel.lastYear}`}
                  variant="caption"
                  sx={{ mb: 0.5, display: 'block' }}
                >
                  {getCarModelLabel(carModel)}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Sin compatibilidad definida.
              </Typography>
            )}
            {compatibleCarModels.length > 3 && (
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                y {compatibleCarModels.length - 3} más...
              </Typography>
            )}
          </Box>
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
        description={`¿Estás seguro de que quieres eliminar la tapa "${product.name}"? Esta acción no se puede deshacer.`}
        isSubmitting={isDeleting}
      />
    </>
  );
};

export default CapCard;
