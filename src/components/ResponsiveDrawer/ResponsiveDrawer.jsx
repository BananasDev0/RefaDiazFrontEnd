import MobileDrawer from './MobileDrawer';
import CustomDrawer from './CustomDrawer';
import { useMobile } from '../MobileProvider';

const ResponsiveDrawer = ({ open, handleDrawerClose,setComponent }) => {
  const responsive = useMobile(); // 'sm' para dispositivos móviles

  // Renderiza MobileDrawer o CustomDrawer dependiendo de si es móvil o no
  return responsive.isMobile || responsive.isLandscape ? (
    <MobileDrawer open={open} handleDrawerClose={handleDrawerClose} setComponent = {setComponent}/>
  ) : (
    <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} setComponent = {setComponent}/>
  );
};

export default ResponsiveDrawer;
