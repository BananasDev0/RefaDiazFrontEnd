import { Box, Card, CardContent, CardHeader, Chip, IconButton, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CategoryIcon from '@mui/icons-material/Category';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import type { Product } from '../../types/product.types';
import ProductCardMenu from './ProductCardMenu';
import { productCardSx } from './productCardStyles';
import { useProductCardActions } from './useProductCardActions';

interface AccessoryCardProps {
  product: Product;
}

const AccessoryCard = ({ product }: AccessoryCardProps) => {
  const actions = useProductCardActions(product, `/products/accesorios/edit/${product.id}`);
  const accessoryModels = product.productCarModels ?? [];

  return (
    <>
      <Card sx={productCardSx} onClick={actions.handleCardClick}>
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
            <IconButton aria-label="acciones del accesorio" onClick={actions.handleMenuClick}>
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
      <ProductCardMenu
        anchorEl={actions.anchorEl}
        open={actions.menuOpen}
        onClose={actions.handleMenuClose}
        onClick={actions.handleMenuCloseFromMouse}
        onEdit={actions.handleEdit}
        onDelete={actions.handleDeleteClick}
      />
      <ConfirmDialog
        open={actions.dialogOpen}
        onClose={actions.closeDialog}
        onConfirm={actions.handleConfirmDelete}
        title="Confirmar Eliminación"
        description={`¿Estás seguro de que quieres eliminar el accesorio "${product.name}"? Esta acción no se puede deshacer.`}
        isSubmitting={actions.isDeleting}
      />
    </>
  );
};

export default AccessoryCard;
