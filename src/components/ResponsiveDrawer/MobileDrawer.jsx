import DrawerHeader from '../DrawerHeader';
import { Divider } from '@mui/material';
import ElementList from '../ElementList';
import Drawer from '@mui/material/Drawer';
import ElementListAdmin from '../ElementListAdmin';

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
      <ElementList setComponent= {setComponent}/>
      <Divider />
      <ElementListAdmin setComponent={setComponent}/>
    </Drawer>
  );
};

export default MobileDrawer;
