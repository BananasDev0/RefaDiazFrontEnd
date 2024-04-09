import DrawerHeader from '../DrawerHeader';
import { Divider } from '@mui/material';
import ElementList from '../ElementList';
import Drawer from '@mui/material/Drawer';
import { adminMenus, mainMenus } from './menus';

const drawerWidth = 240;

const MobileDrawer = ({ open, handleDrawerClose,setComponent }) => { // Agrega handleDrawerClose como una prop
  return (
    <Drawer 
    variant="temporary"
    open={open}
    onClose={handleDrawerClose}
    ModalProps={{
      keepMounted: true, // Better open performance on mobile.
    }}
    sx={{
      display: { xs: 'block'},
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    }}>
      <DrawerHeader handleDrawerClose={handleDrawerClose} />
      <Divider />
      <ElementList setComponent = {setComponent} open={open} menuItems={mainMenus}/>
      <Divider />
      <ElementList setComponent = {setComponent} open={open} menuItems={adminMenus}/>
    </Drawer>
  );
};

export default MobileDrawer;
