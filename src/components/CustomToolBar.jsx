import { useState } from 'react';
import { Toolbar, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function CustomToolBar({ handleDrawerOpen, open }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          marginRight: '36px', // Aumentado para evitar que el menú y el botón estén demasiado juntos
          ...(open && { display: "none" }),
        }}
      >
        <MenuIcon />
      </IconButton>

      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        Refa Diaz
      </Typography>

      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
        sx={{
          fontSize: '2rem', // Esto cambiará el tamaño del botón. Ajusta según sea necesario.
        }}
      >
        <AccountCircle sx={{ fontSize: '2rem' }} /> {/* Ajusta el tamaño del ícono aquí */}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Ver perfil</MenuItem>
        <MenuItem onClick={handleMenuClose}>Cerrar sesión</MenuItem>
      </Menu>
    </Toolbar>
  );
}
