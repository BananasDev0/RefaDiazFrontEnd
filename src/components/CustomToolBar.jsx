import { useState } from 'react';
import { Toolbar, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logo from '../assets/IMAGEN SIN FONDO CIRCULO.png';
import { auth } from '../services/Firebase/firebase';


export default function CustomToolBar({ handleDrawerOpen, open }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    try {
      auth.signOut();
    } catch(error) {
      console.log(error.message);
    }
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
      <img
        src={Logo}
        alt='Logotipo Refaccionaria Diaz'
        style={{ width: 50, height: 'auto', marginBottom: 10,marginRight:10,marginTop:10 }}
      />
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        Radiadorez Diaz
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
        <MenuItem>Ver perfil</MenuItem>
        <MenuItem onClick={handleMenuClose}>Cerrar sesión</MenuItem>
      </Menu>
    </Toolbar>
  );
}
