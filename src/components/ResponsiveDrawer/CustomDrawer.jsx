import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { openedMixin, closedMixin } from '../../styles/utils/drawerFunctions';
import DrawerHeader from '../DrawerHeader';
import { Divider } from '@mui/material';
import ElementList from '../ElementList';

import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import { ROLES } from '../../util/userConstants';
import ProductsPage from '../../pages/Products/ProductsPage';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import UserPage from '../../pages/Users/UserPage';


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

const mainMenus = [
  { text: 'Productos', icon: <InventoryIcon />, roles: [ROLES.ADMIN, ROLES.EMPLOYEE], component: <ProductsPage/> },
  { text: 'Servicios', icon: <MiscellaneousServicesIcon />, roles: [ROLES.ADMIN, ROLES.EMPLOYEE] },
  { text: 'Autos', icon: <DirectionsCarFilledIcon />, roles: [ROLES.ADMIN, ROLES.EMPLOYEE] },
  { text: 'Proveedores', icon: <PersonIcon />, roles: [ROLES.ADMIN, ROLES.EMPLOYEE] },
];

const adminMenus = [
  { text: 'Usuarios', icon: <ManageAccountsIcon />, roles: [ROLES.ADMIN], component: <UserPage/> }
];


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
