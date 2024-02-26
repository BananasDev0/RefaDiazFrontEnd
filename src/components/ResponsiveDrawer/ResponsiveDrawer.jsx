import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileDrawer from './MobileDrawer';
import CustomDrawer from './CustomDrawer';

const ResponsiveDrawer = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 'sm' para dispositivos móviles

  // Renderiza MobileDrawer o CustomDrawer dependiendo de si es móvil o no
  return isMobile ? (
    <MobileDrawer open={open} handleDrawerClose={handleDrawerClose} />
  ) : (
    <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} />
  );
};

export default ResponsiveDrawer;
