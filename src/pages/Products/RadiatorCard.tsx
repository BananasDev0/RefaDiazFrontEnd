import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import type { Product } from '../../types/product.types';
import { useProductMutations } from '../../hooks/useProductMutations';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';

interface RadiatorCardProps {
  product: Product;
}

export const RadiatorCard: React.FC<RadiatorCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { productType } = useParams<{ productType: string }>();
  const { deleteProduct, isDeleting } = useProductMutations();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const menuOpen = Boolean(anchorEl);
  const visibleCompatibilityCount = isXs ? 2 : 3;
  const visibleCompatibilities = product.productCarModels?.slice(0, visibleCompatibilityCount) ?? [];
  const hiddenCompatibilityCount = Math.max((product.productCarModels?.length ?? 0) - visibleCompatibilityCount, 0);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent card click
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuCloseFromMouse = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (product.id) {
      navigate(`/products/${productType}/edit/${product.id}`);
    }
    handleMenuClose();
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    if (product.id) {
      deleteProduct(product.id, {
        onSuccess: () => {
          setDialogOpen(false);
        },
      });
    }
  };

  const handleCardClick = () => {
    if (product.id) {
      navigate(`/products/${productType}/edit/${product.id}`);
    }
  };

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          '@media (hover: hover)': {
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-4px)',
            },
          },
          transition: 'box-shadow 0.3s, transform 0.3s',
        }}
        onClick={handleCardClick}
      >
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
              <Chip
                label={`DPI: ${product.dpi || 'N/D'}`}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ height: { xs: 28, sm: 32 }, '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } } }}
              />
              <Chip
                label={`Stock: ${product.stockCount}`}
                size="small"
                sx={{ height: { xs: 28, sm: 32 }, '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } } }}
              />
            </Box>
          }
          action={
            <IconButton aria-label="acciones del radiador" size={isXs ? 'small' : 'medium'} onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          }
          sx={{
            px: { xs: 1.25, sm: 2 },
            py: { xs: 1, sm: 1.5 },
            borderBottom: '1px solid',
            borderColor: 'divider',
            '& .MuiCardHeader-action': {
              m: 0,
              alignSelf: 'center',
            },
          }}
        />

        <CardContent
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            px: { xs: 1.25, sm: 2 },
            py: { xs: 1.25, sm: 2 },
            '&:last-child': {
              pb: { xs: 1.25, sm: 2 },
            },
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
              fontWeight: 'medium',
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              lineHeight: 1.25,
            }}
          >
            <DirectionsCarIcon sx={{ mr: 0.75, fontSize: { xs: '0.95rem', sm: '1.1rem' } }} />
            Modelos compatibles:
          </Typography>
          
          <Box>
            {visibleCompatibilities.length > 0 ? (
              visibleCompatibilities.map((pcm) => (
                <Typography 
                  key={`${pcm.carModel.id}-${pcm.initialYear}`}
                  variant="caption"
                  sx={{
                    mb: 0.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.35,
                    minHeight: { xs: '2.4em', sm: 'auto' },
                  }}
                >
                  {`${pcm.carModel.brand?.name} ${pcm.carModel.name} (${pcm.initialYear}-${pcm.lastYear})`}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                Sin compatibilidad definida.
              </Typography>
            )}
            {hiddenCompatibilityCount > 0 && (
              <Typography variant="caption" sx={{ fontStyle: 'italic', display: 'block', mt: 0.25 }}>
                y {hiddenCompatibilityCount} más...
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
        description={`¿Estás seguro de que quieres eliminar el producto "${product.name || product.dpi}"? Esta acción no se puede deshacer.`}
        isSubmitting={isDeleting}
      />
    </>
  );
};

export default RadiatorCard;
