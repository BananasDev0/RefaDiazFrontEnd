import MobileDrawer from './MobileDrawer';
import CustomDrawer from './CustomDrawer';
import { useMobile } from '../MobileProvider';

const ResponsiveDrawer = ({ open, handleDrawerClose, navigate }) => {
  const responsive = useMobile(); // 'sm' para dispositivos móviles

  const handleMenuClick = (path) => {
    navigate(path);
    handleDrawerClose();
  };
  
  // Renderiza MobileDrawer o CustomDrawer dependiendo de si es móvil o no
  return responsive.isMobile || responsive.isLandscape ? (
    <MobileDrawer open={open} handleDrawerClose={handleDrawerClose} setComponent = {handleMenuClick}/>
  ) : (
    <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} setComponent = {handleMenuClick}/>
  );
};

export default ResponsiveDrawer;
