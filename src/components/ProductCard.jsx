import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Tooltip, Divider } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TagIcon from '@mui/icons-material/Tag';

export const ProductCard = ({ product, onClick, menuOptions = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, option) => {
    event.stopPropagation();
    handleClose();
    option.onClick(product);
  };

  const formatModels = (carModels) => {
    if (!carModels || carModels.length === 0) return 'Sin modelos asignados';
    
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {carModels.map((carModel, index) => (
          <Typography
            key={index}
            variant="caption"
            sx={{
              fontSize: '11px',
              color: 'text.secondary',
              display: 'block',
              textAlign: 'center'
            }}
          >
            {carModel.carModel?.brand?.name} {carModel.carModel?.name} ({carModel.initialYear}-{carModel.lastYear})
          </Typography>
        ))}
      </Box>
    );
  };

  return (
    <Card sx={{ margin: 2, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Tooltip title={product.name}>
        <CardActionArea 
          onClick={(e) => onClick(e, product)} 
          sx={{ 
            height: '100%',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'stretch',
            justifyContent: 'flex-start'
          }}
        >
          {/* Imagen del producto */}
          {product.imageUrl && (
            <CardMedia
              component="img"
              sx={{ 
                width: '100%', 
                height: 120, 
                objectFit: 'contain',
                backgroundColor: '#f5f5f5'
              }}
              image={product.imageUrl}
              alt={`Imagen de ${product.name}`}
            />
          )}
          
          <CardContent sx={{ 
            flexGrow: 1, 
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>

            {/* Sección 1: DPI */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <TagIcon sx={{ fontSize: 16, color: 'primary.main' }} />
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                DPI: {product.dpi || 'N/A'}
              </Typography>
            </Box>

            <Divider />

            {/* Sección 2: Modelos asociados */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <DirectionsCarIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" sx={{ fontWeight: 'medium', fontSize: '12px' }}>
                  Modelos compatibles:
                </Typography>
              </Box>
              {formatModels(product.carModels)}
            </Box>
          </CardContent>
        </CardActionArea>
      </Tooltip>
      
      {/* Menú de opciones */}
      {menuOptions.length > 0 && (
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {menuOptions.map((option) => (
              <MenuItem key={option.label} onClick={(event) => handleMenuItemClick(event, option)}>
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Card>
  );
}; 