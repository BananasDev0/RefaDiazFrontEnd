import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useParams } from 'react-router-dom';
import type { Product } from '../../types/product.types';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { getCarModelLabel } from '../../utils/carModels';
import ProductCardMenu from './ProductCardMenu';
import { productCardSx } from './productCardStyles';
import { useProductCardActions } from './useProductCardActions';

interface RadiatorCardProps {
  product: Product;
}

const RadiatorCard = ({ product }: RadiatorCardProps) => {
  const { productType } = useParams<{ productType: string }>();
  const actions = useProductCardActions(product, `/products/${productType}/edit/${product.id}`);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const visibleCompatibilityCount = isXs ? 2 : 3;
  const visibleCompatibilities = product.productCarModels?.slice(0, visibleCompatibilityCount) ?? [];
  const hiddenCompatibilityCount = Math.max((product.productCarModels?.length ?? 0) - visibleCompatibilityCount, 0);

  return (
    <>
      <Card sx={productCardSx} onClick={actions.handleCardClick}>
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
            <IconButton aria-label="acciones del radiador" size={isXs ? 'small' : 'medium'} onClick={actions.handleMenuClick}>
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
                  {getCarModelLabel(pcm)}
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
        description={`¿Estás seguro de que quieres eliminar el producto "${product.name || product.dpi}"? Esta acción no se puede deshacer.`}
        isSubmitting={actions.isDeleting}
      />
    </>
  );
};

export default RadiatorCard;
