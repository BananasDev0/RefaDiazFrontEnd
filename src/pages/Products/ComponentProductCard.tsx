import { Box, Card, CardContent, CardHeader, Chip, IconButton, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SellIcon from '@mui/icons-material/Sell';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { getCarModelLabel, getCompatibleCarModels } from '../../utils/carModels';
import type { Product } from '../../types/product.types';
import ProductCardMenu from './ProductCardMenu';
import { productCardSx } from './productCardStyles';
import { useProductCardActions } from './useProductCardActions';

interface ComponentProductCardProps {
  product: Product;
  /** Segmento de la URL de edición, p. ej. 'tapas' o 'abanicos'. */
  productTypeSlug: string;
  /** aria-label del botón de acciones, p. ej. 'acciones de la tapa'. */
  actionsAriaLabel: string;
  /** Entidad con artículo para el texto de borrado, p. ej. 'la tapa' o 'el abanico'. */
  deleteEntityLabel: string;
}

/**
 * Card de catálogo para componentes de radiador (tapas y abanicos),
 * parametrizada por tipo de producto.
 */
const ComponentProductCard = ({
  product,
  productTypeSlug,
  actionsAriaLabel,
  deleteEntityLabel,
}: ComponentProductCardProps) => {
  const actions = useProductCardActions(product, `/products/${productTypeSlug}/edit/${product.id}`);
  const compatibleCarModels = getCompatibleCarModels(product);

  return (
    <>
      <Card sx={productCardSx} onClick={actions.handleCardClick}>
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
            <IconButton aria-label={actionsAriaLabel} onClick={actions.handleMenuClick}>
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
        description={`¿Estás seguro de que quieres eliminar ${deleteEntityLabel} "${product.name}"? Esta acción no se puede deshacer.`}
        isSubmitting={actions.isDeleting}
      />
    </>
  );
};

export default ComponentProductCard;
