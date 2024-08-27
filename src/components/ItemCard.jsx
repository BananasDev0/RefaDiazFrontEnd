import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const ItemCard = ({ item, columns, onClick, menuOptions = [] }) => {
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
    option.onClick(item);
  };

  return (
    <Card sx={{ margin: 2, position: 'relative' }}>
      <Tooltip title={item.name}>
        <CardActionArea 
          onClick={(e) => onClick(e, item)} 
          sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {item.imageUrl && (
            <CardMedia
              component="img"
              sx={{ width: 160, height: 160, objectFit: 'contain' }}
              image={item.imageUrl}
              alt={`Imagen de ${item.name}`}
            />
          )}
          <CardContent sx={{ width: '100%' }}>
            {columns.map((column) => (
              <Box key={column.field} sx={{ display: 'flex', justifyContent: 'center', marginBottom: 1 }}>
                {column.showLabel !== false && (
                  <Typography
                    sx={{
                      marginRight: 1,
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }}
                    color="textSecondary"
                  >
                    {column.headerName}:
                  </Typography>
                )}
                <Typography sx={{ fontSize: '12px', ...(column.valueStyle || {}) }}>
                  {column.field === 'dpi' ? item[column.field] : ''}
                  {column.field === 'name' ? (item[column.field].length > 20 ? item[column.field].slice(0, 20) + '...' : item[column.field]) : ''}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </CardActionArea>
      </Tooltip>
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