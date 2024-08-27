import { useState, useEffect } from 'react';
import { Toolbar, IconButton, Typography, Menu, MenuItem, Box, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logo from '../assets/IMAGEN SIN FONDO CIRCULO.png';
import { auth } from '../services/Firebase/firebase';

export default function CustomToolBar({ handleDrawerOpen, open }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo) {
      setUserName(userInfo.person.name);
      setUserRole(userInfo.role.description);
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };  

  const handleLogOut = () => {
    handleMenuClose();
    try {
      auth.signOut();
    } catch(error) {
      console.log(error.message);
    }
  }

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          marginRight: '36px',
          ...(open && { display: "none" }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <img
        src={Logo}
        alt='Logotipo Refaccionaria Diaz'
        style={{ width: 50, height: 'auto', marginBottom: 10, marginRight: 10, marginTop: 10 }}
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
        sx={{ fontSize: '2rem' }}
      >
        <AccountCircle sx={{ fontSize: '2rem' }} />
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
        <Box sx={{ px: 3, py: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {userRole}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleLogOut} sx={{ justifyContent: 'center', mt: 1 }}>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </Toolbar>
  );
}