import Drawer from '@mui/material/Drawer';
// import { adminMenus, mainMenus } from './menus'; // Comentado o eliminado
import DrawerContent from './DrawerContent'; // Importar el nuevo componente

const drawerWidth = 240;

const MobileDrawer = ({ open, handleDrawerClose, setComponent }) => {
  return (
    <Drawer 
      variant="temporary"
      open={open}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <DrawerContent 
        handleDrawerClose={handleDrawerClose} 
        setComponent={setComponent} 
        open={open} 
      />
    </Drawer>
  );
};

export default MobileDrawer;
