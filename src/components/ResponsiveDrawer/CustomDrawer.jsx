import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { openedMixin, closedMixin } from '../../styles/utils/drawerFunctions';
import DrawerHeader from '../DrawerHeader';
import { Divider } from '@mui/material';
import ElementList from '../ElementList';
import { adminMenus, mainMenus } from './menus';



const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const CustomDrawer = ({ open, handleDrawerClose,setComponent }) => { // Agrega handleDrawerClose como una prop
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader handleDrawerClose={handleDrawerClose} />
      <Divider />
      <ElementList setComponent = {setComponent} open={open} menuItems={mainMenus}/>
      <Divider />
      <ElementList setComponent = {setComponent} open={open} menuItems={adminMenus}/>
    </Drawer>
  );
};

export default CustomDrawer;
