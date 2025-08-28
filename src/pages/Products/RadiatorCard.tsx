import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useNavigate, useParams } from 'react-router-dom';
import type { Product } from '../../types/product.types';

interface RadiatorCardProps {
  product: Product;
}

export const RadiatorCard: React.FC<RadiatorCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { productType } = useParams<{ productType: string }>();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log('Abrir menú para el producto:', product.id);
    // Future: Implement dropdown menu (edit, delete, etc.)
  };

  const handleCardClick = () => {
    if (product.id) {
      navigate(`/products/${productType}/edit/${product.id}`);
    }
  };

  return (
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
      onClick={handleCardClick}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Chip label={`DPI: ${product.dpi || 'N/D'}`} size="small" color="primary" variant="outlined" />
            <Chip label={`Stock: ${product.stockCount}`} size="small" />
          </Box>
        }
        action={
          <IconButton aria-label="settings" onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
        }
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />

      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, fontWeight: 'medium' }}>
          <DirectionsCarIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
          Modelos compatibles:
        </Typography>
        
        <Box>
          {product.productCarModels && product.productCarModels.length > 0 ? (
            product.productCarModels.slice(0, 3).map((pcm) => ( // Limiting to 3 for display
              <Typography 
                key={`${pcm.carModel.id}-${pcm.initialYear}`}
                variant="caption"
                sx={{ mb: 0.5, display: 'block' }}
              >
                {`${pcm.carModel.brand?.name} ${pcm.carModel.name} (${pcm.initialYear}-${pcm.lastYear})`}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Sin compatibilidad definida.
            </Typography>
          )}
          {product.productCarModels && product.productCarModels.length > 3 && (
            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
              y {product.productCarModels.length - 3} más...
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RadiatorCard;
