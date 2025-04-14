import DrawerHeader from '../DrawerHeader';
import { Divider } from '@mui/material';
import ElementList from '../ElementList';
import { adminMenus, mainMenus } from './menus';

// Componente que contiene la estructura interna común de los drawers
const DrawerContent = ({ handleDrawerClose, setComponent, open }) => {
  return (
    <>
      <DrawerHeader handleDrawerClose={handleDrawerClose} />
      <Divider />
      <ElementList setComponent={setComponent} open={open} menuItems={mainMenus} />
      <Divider />
      <ElementList setComponent={setComponent} open={open} menuItems={adminMenus} />
    </>
  );
};

export default DrawerContent; 