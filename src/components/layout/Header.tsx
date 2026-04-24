import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar as MuiAppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem, Divider, styled} from '@mui/material';
import type { AppBarProps as MuiAppBarProps } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { getStoredUser } from '../../services/AuthService';
import Logo from '../../assets/LOGO CON CONTORNO BLANCO RD.png';
import { useAuth } from '../../hooks/useAuth';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  isMobile?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile',
})<AppBarProps>(({ theme, open, isMobile }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && !isMobile && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface HeaderProps {
  open: boolean;
  handleDrawerToggle: () => void;
  isMobile?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ open, handleDrawerToggle, isMobile = false }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const user = useMemo(() => getStoredUser(), []);
  const { logout } = useAuth();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      handleMenuClose();
    }
  };

  return (
    <AppBar position="fixed" open={open} isMobile={isMobile}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label={open && isMobile ? 'close drawer' : 'open drawer'}
          onClick={handleDrawerToggle}
          edge="start"
          sx={{ mr: 2, ...(open && !isMobile && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '16px', marginLeft: '8px' }} />
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} />
        <Box>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <Box sx={{ px: 2, py: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {user?.person?.name || 'Usuario'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.role?.description || 'Rol'}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
