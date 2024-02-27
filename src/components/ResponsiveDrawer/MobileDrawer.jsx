import DrawerHeader from '../DrawerHeader';
import { Divider } from '@mui/material';
import ElementList from '../ElementList';
import Drawer from '@mui/material/Drawer';

const drawerWidth = 240;

const MobileDrawer = ({ open, handleDrawerClose }) => { // Agrega handleDrawerClose como una prop
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
      <ElementList />
      <Divider />
      <ElementList />
    </Drawer>
  );
};

export default MobileDrawer;
